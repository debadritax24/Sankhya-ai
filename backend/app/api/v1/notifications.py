from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.core.security import get_current_user
from app.models import User, Notification
from app.schemas.common import APIResponse, PaginatedResponse

router = APIRouter()


class NotificationResponse(BaseModel):
    """Notification response schema."""
    id: str
    title: str
    message: str | None = None
    type: str
    read: bool
    created_at: str


@router.get("", response_model=PaginatedResponse)
async def list_notifications(
    unread_only: bool = Query(False, description="Filter to unread notifications only"),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(20, ge=1, le=100, description="Items per page"),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """List notifications for the authenticated user with optional unread filtering."""
    query = select(Notification).where(Notification.user_id == current_user.id)
    count_query = select(Notification).where(Notification.user_id == current_user.id)

    if unread_only:
        query = query.where(Notification.read == False)
        count_query = count_query.where(Notification.read == False)

    query = query.order_by(Notification.created_at.desc())

    from sqlalchemy import func
    total_result = await db.execute(select(func.count()).select_from(count_query.subquery()))
    total = total_result.scalar() or 0

    offset = (page - 1) * page_size
    query = query.offset(offset).limit(page_size)
    result = await db.execute(query)
    notifications = result.scalars().all()

    total_pages = (total + page_size - 1) // page_size if total > 0 else 1

    data = [
        NotificationResponse(
            id=n.id,
            title=n.title,
            message=n.message,
            type=n.type,
            read=n.read,
            created_at=n.created_at.isoformat() if n.created_at else None,
        ).model_dump()
        for n in notifications
    ]

    return PaginatedResponse(
        success=True,
        message="Notifications retrieved successfully",
        data=data,
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
        has_next=page < total_pages,
        has_previous=page > 1,
    )


@router.put("/{notification_id}/read", response_model=APIResponse)
async def mark_notification_read(
    notification_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Mark a specific notification as read."""
    result = await db.execute(
        select(Notification).where(
            Notification.id == notification_id,
            Notification.user_id == current_user.id,
        )
    )
    notification = result.scalar_one_or_none()
    if not notification:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found",
        )

    notification.read = True
    db.add(notification)
    await db.flush()

    return APIResponse(
        success=True,
        message="Notification marked as read",
        data={
            "id": notification.id,
            "read": True,
        },
    )
