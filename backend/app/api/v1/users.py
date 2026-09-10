from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.core.security import get_current_user
from app.models import User
from app.schemas.common import APIResponse
from app.schemas.user import UserResponse, UserUpdate

router = APIRouter()


@router.get("/me", response_model=APIResponse[UserResponse])
async def get_current_user_profile(
    current_user: User = Depends(get_current_user),
):
    """Get the authenticated user's own profile."""
    user_data = UserResponse.model_validate(current_user)
    return APIResponse(
        success=True,
        message="User profile retrieved successfully",
        data=user_data,
    )


@router.get("/{user_id}", response_model=APIResponse[UserResponse])
async def get_user_by_id(
    user_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get a user's profile by their ID."""
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    user_data = UserResponse.model_validate(user)
    return APIResponse(
        success=True,
        message="User retrieved successfully",
        data=user_data,
    )


@router.put("/me", response_model=APIResponse[UserResponse])
async def update_current_user_profile(
    update_data: UserUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Update the authenticated user's own profile."""
    update_dict = update_data.model_dump(exclude_unset=True)
    for field, value in update_dict.items():
        setattr(current_user, field, value)

    db.add(current_user)
    await db.flush()
    await db.refresh(current_user)

    user_data = UserResponse.model_validate(current_user)
    return APIResponse(
        success=True,
        message="Profile updated successfully",
        data=user_data,
    )
