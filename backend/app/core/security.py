import jwt
import httpx
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.config import get_settings
from app.core.database import get_db
from app.core.logging import logger

settings = get_settings()
security = HTTPBearer()

CLERK_JWKS_URL = "https://api.clerk.com/v1/jwks"
_jwks_cache: dict = {}


async def _get_jwks() -> dict:
    if _jwks_cache:
        return _jwks_cache
    try:
        async with httpx.AsyncClient() as client:
            resp = await client.get(CLERK_JWKS_URL, timeout=10)
            resp.raise_for_status()
            _jwks_cache.update(resp.json())
            return _jwks_cache
    except Exception as e:
        logger.error("clerk_jwks_fetch_failed", error=str(e))
        raise HTTPException(status_code=503, detail="Auth service unavailable")


def _get_signing_key(jwt_header: dict) -> str:
    kid = jwt_header.get("kid")
    if not kid:
        raise HTTPException(status_code=401, detail="Invalid token")
    keys = _jwks_cache.get("keys", [])
    for key in keys:
        if key.get("kid") == kid:
            from jwt.algorithms import RSAAlgorithm
            return RSAAlgorithm.from_jwk(key)
    raise HTTPException(status_code=401, detail="Invalid token key")


async def decode_clerk_token(token: str) -> dict:
    try:
        unverified_header = jwt.get_unverified_header(token)
        signing_key = _get_signing_key(unverified_header)
        payload = jwt.decode(
            token,
            signing_key,
            algorithms=["RS256"],
            options={"verify_aud": False},
        )
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db),
):
    token = credentials.payload
    payload = await decode_clerk_token(token)

    clerk_user_id = payload.get("sub")
    if not clerk_user_id:
        raise HTTPException(status_code=401, detail="Invalid token payload")

    from app.models import User
    result = await db.execute(select(User).where(User.clerk_user_id == clerk_user_id))
    user = result.scalar_one_or_none()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user


class RoleChecker:
    def __init__(self, allowed_roles: list[str]):
        self.allowed_roles = allowed_roles

    async def __call__(self, current_user=Depends(get_current_user)):
        user_role = current_user.role_id
        if user_role not in self.allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions",
            )
        return current_user


require_learner = RoleChecker(["LEARNER", "TRAINER", "ADMIN", "SUPER_ADMIN"])
require_trainer = RoleChecker(["TRAINER", "ADMIN", "SUPER_ADMIN"])
require_admin = RoleChecker(["ADMIN", "SUPER_ADMIN"])
require_super_admin = RoleChecker(["SUPER_ADMIN"])
