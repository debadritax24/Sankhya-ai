from datetime import datetime
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import User


class UserService:
    """Service for user CRUD and Clerk integration."""

    @staticmethod
    async def get_by_clerk_id(db: AsyncSession, clerk_user_id: str) -> User | None:
        """Retrieve a user by their Clerk ID."""
        result = await db.execute(select(User).where(User.clerk_user_id == clerk_user_id))
        return result.scalar_one_or_none()

    @staticmethod
    async def get_by_id(db: AsyncSession, user_id: str) -> User | None:
        """Retrieve a user by primary key."""
        result = await db.execute(select(User).where(User.id == user_id))
        return result.scalar_one_or_none()

    @staticmethod
    async def create(db: AsyncSession, user_data: dict) -> User:
        """Create a new user from a data dict."""
        user = User(**user_data)
        db.add(user)
        await db.flush()
        await db.refresh(user)
        return user

    @staticmethod
    async def update(db: AsyncSession, user_id: str, user_data: dict) -> User:
        """Update an existing user. Raises ValueError if not found."""
        result = await db.execute(select(User).where(User.id == user_id))
        user = result.scalar_one_or_none()
        if user is None:
            raise ValueError(f"User {user_id} not found")
        for field, value in user_data.items():
            if hasattr(user, field) and value is not None:
                setattr(user, field, value)
        user.updated_at = datetime.utcnow()
        await db.flush()
        await db.refresh(user)
        return user

    @staticmethod
    async def get_or_create_from_clerk(
        db: AsyncSession,
        clerk_user_id: str,
        email: str,
        name: str,
    ) -> User:
        """Find an existing user by Clerk ID, or create one."""
        user = await UserService.get_by_clerk_id(db, clerk_user_id)
        if user is not None:
            return user
        user = User(
            clerk_user_id=clerk_user_id,
            email=email,
            name=name,
        )
        db.add(user)
        await db.flush()
        await db.refresh(user)
        return user
