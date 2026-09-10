from datetime import datetime
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.core.security import get_current_user
from app.models import User, LearningProgress, Course
from app.schemas.common import APIResponse

router = APIRouter()


class LearningProgressCreate(BaseModel):
    """Schema for creating a new learning progress entry."""
    course_id: str = Field(..., description="Course ID to start tracking")
    progress_percentage: float = Field(default=0.0, ge=0, le=100, description="Initial progress percentage")


class LearningProgressUpdate(BaseModel):
    """Schema for updating learning progress."""
    progress_percentage: float | None = Field(None, ge=0, le=100, description="Updated progress percentage")
    learning_minutes: int | None = Field(None, ge=0, description="Minutes spent learning")
    status: str | None = Field(None, description="Updated status (NOT_STARTED, IN_PROGRESS, COMPLETED, DROPPED)")


class LearningProgressResponse(BaseModel):
    """Schema for learning progress response."""
    id: str
    course_id: str
    status: str
    progress_percentage: float
    started_at: Optional[str] = None
    completed_at: Optional[str] = None
    learning_minutes: int
    last_activity_at: Optional[str] = None


@router.get("/progress", response_model=APIResponse[list[LearningProgressResponse]])
async def get_learning_progress(
    status_filter: str | None = Query(None, alias="status", description="Filter by status"),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get all learning progress entries for the authenticated user."""
    query = select(LearningProgress).where(LearningProgress.user_id == current_user.id)

    if status_filter:
        query = query.where(LearningProgress.status == status_filter.upper())

    query = query.order_by(LearningProgress.last_activity_at.desc())
    result = await db.execute(query)
    progress_entries = result.scalars().all()

    data = [
        LearningProgressResponse(
            id=p.id,
            course_id=p.course_id,
            status=p.status,
            progress_percentage=p.progress_percentage,
            started_at=p.started_at.isoformat() if p.started_at else None,
            completed_at=p.completed_at.isoformat() if p.completed_at else None,
            learning_minutes=p.learning_minutes,
            last_activity_at=p.last_activity_at.isoformat() if p.last_activity_at else None,
        )
        for p in progress_entries
    ]

    return APIResponse(
        success=True,
        message="Learning progress retrieved successfully",
        data=data,
    )


@router.post("/progress", response_model=APIResponse[LearningProgressResponse], status_code=status.HTTP_201_CREATED)
async def create_learning_progress(
    progress_data: LearningProgressCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Start tracking learning progress for a new course."""
    course_result = await db.execute(select(Course).where(Course.id == progress_data.course_id))
    course = course_result.scalar_one_or_none()
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found",
        )

    existing = await db.execute(
        select(LearningProgress).where(
            LearningProgress.user_id == current_user.id,
            LearningProgress.course_id == progress_data.course_id,
        )
    )
    if existing.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Learning progress already exists for this course",
        )

    now = datetime.utcnow()
    new_progress = LearningProgress(
        user_id=current_user.id,
        course_id=progress_data.course_id,
        status="IN_PROGRESS" if progress_data.progress_percentage > 0 else "NOT_STARTED",
        progress_percentage=progress_data.progress_percentage,
        started_at=now if progress_data.progress_percentage > 0 else None,
        learning_minutes=0,
        last_activity_at=now,
    )

    db.add(new_progress)
    await db.flush()
    await db.refresh(new_progress)

    return APIResponse(
        success=True,
        message="Learning progress created successfully",
        data=LearningProgressResponse(
            id=new_progress.id,
            course_id=new_progress.course_id,
            status=new_progress.status,
            progress_percentage=new_progress.progress_percentage,
            started_at=new_progress.started_at.isoformat() if new_progress.started_at else None,
            completed_at=new_progress.completed_at.isoformat() if new_progress.completed_at else None,
            learning_minutes=new_progress.learning_minutes,
            last_activity_at=new_progress.last_activity_at.isoformat() if new_progress.last_activity_at else None,
        ),
    )


@router.put("/progress/{course_id}", response_model=APIResponse[LearningProgressResponse])
async def update_learning_progress(
    course_id: str,
    update_data: LearningProgressUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Update learning progress for a specific course."""
    result = await db.execute(
        select(LearningProgress).where(
            LearningProgress.user_id == current_user.id,
            LearningProgress.course_id == course_id,
        )
    )
    progress = result.scalar_one_or_none()
    if not progress:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Learning progress not found for this course",
        )

    now = datetime.utcnow()

    if update_data.progress_percentage is not None:
        progress.progress_percentage = update_data.progress_percentage
        if progress.progress_percentage > 0 and progress.started_at is None:
            progress.started_at = now
        if update_data.progress_percentage >= 100:
            progress.status = "COMPLETED"
            progress.completed_at = now

    if update_data.learning_minutes is not None:
        progress.learning_minutes += update_data.learning_minutes

    if update_data.status is not None:
        progress.status = update_data.status.upper()
        if progress.status == "COMPLETED":
            progress.completed_at = now
            progress.progress_percentage = 100.0
        elif progress.status == "IN_PROGRESS" and progress.started_at is None:
            progress.started_at = now

    progress.last_activity_at = now

    db.add(progress)
    await db.flush()
    await db.refresh(progress)

    return APIResponse(
        success=True,
        message="Learning progress updated successfully",
        data=LearningProgressResponse(
            id=progress.id,
            course_id=progress.course_id,
            status=progress.status,
            progress_percentage=progress.progress_percentage,
            started_at=progress.started_at.isoformat() if progress.started_at else None,
            completed_at=progress.completed_at.isoformat() if progress.completed_at else None,
            learning_minutes=progress.learning_minutes,
            last_activity_at=progress.last_activity_at.isoformat() if progress.last_activity_at else None,
        ),
    )
