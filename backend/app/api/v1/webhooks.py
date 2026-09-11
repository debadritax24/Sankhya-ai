from fastapi import APIRouter, Request, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from svix.webhooks import Webhook, WebhookVerificationError

from app.core.config import get_settings
from app.core.database import get_db
from app.models import User
from app.core.logging import logger

router = APIRouter()
settings = get_settings()

@router.post("/clerk")
async def clerk_webhook(request: Request, db: AsyncSession = Depends(get_db)):
    """Webhook endpoint to receive user events from Clerk and sync them to our DB."""
    if not settings.CLERK_WEBHOOK_SECRET:
        raise HTTPException(status_code=500, detail="Clerk webhook secret not configured")

    payload = await request.body()
    headers = request.headers

    svix_id = headers.get("svix-id")
    svix_timestamp = headers.get("svix-timestamp")
    svix_signature = headers.get("svix-signature")

    if not svix_id or not svix_timestamp or not svix_signature:
        raise HTTPException(status_code=400, detail="Missing Svix headers")

    wh = Webhook(settings.CLERK_WEBHOOK_SECRET)

    try:
        event = wh.verify(payload, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature
        })
    except WebhookVerificationError:
        raise HTTPException(status_code=400, detail="Invalid signature")

    event_type = event.get("type")
    data = event.get("data", {})
    clerk_id = data.get("id")

    if not clerk_id:
        return {"success": False, "message": "No clerk ID provided"}

    if event_type == "user.created" or event_type == "user.updated":
        # Extract email (primary or first)
        email_addresses = data.get("email_addresses", [])
        primary_email_id = data.get("primary_email_address_id")
        
        email = None
        for ea in email_addresses:
            if ea.get("id") == primary_email_id:
                email = ea.get("email_address")
                break
        
        if not email and email_addresses:
            email = email_addresses[0].get("email_address")

        if not email:
            logger.warning(f"Clerk user {clerk_id} has no email address.")
            return {"success": True, "message": "User has no email, skipped sync"}

        # Combine first and last name
        first_name = data.get("first_name") or ""
        last_name = data.get("last_name") or ""
        name = f"{first_name} {last_name}".strip()
        if not name:
            name = email.split("@")[0]

        # Sync to DB
        result = await db.execute(select(User).where(User.clerk_user_id == clerk_id))
        user = result.scalar_one_or_none()

        if user:
            user.email = email
            user.name = name
            logger.info(f"Updated existing user in DB: {clerk_id}")
        else:
            new_user = User(
                clerk_user_id=clerk_id,
                email=email,
                name=name,
                role_id="LEARNER"  # Default role
            )
            db.add(new_user)
            logger.info(f"Created new user in DB from Clerk webhook: {clerk_id}")

        await db.commit()

    elif event_type == "user.deleted":
        result = await db.execute(select(User).where(User.clerk_user_id == clerk_id))
        user = result.scalar_one_or_none()
        if user:
            await db.delete(user)
            await db.commit()
            logger.info(f"Deleted user from DB via Clerk webhook: {clerk_id}")

    return {"success": True}
