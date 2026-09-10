from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.core.security import get_current_user
from app.models import User, Course
from app.schemas.common import APIResponse, PaginatedResponse

router = APIRouter()


@router.get("", response_model=PaginatedResponse)
async def list_courses(
    source: str | None = Query(None, description="Filter by source (IGOT, TPAC, INTERNAL)"),
    difficulty: str | None = Query(None, description="Filter by difficulty level"),
    search: str | None = Query(None, description="Search by title"),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(20, ge=1, le=100, description="Items per page"),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """List all available courses with optional filtering and search."""
    query = select(Course).where(Course.status == "ACTIVE")
    count_query = select(Course).where(Course.status == "ACTIVE")

    if source:
        query = query.where(Course.source == source.upper())
        count_query = count_query.where(Course.source == source.upper())
    if difficulty:
        query = query.where(Course.difficulty == difficulty)
        count_query = count_query.where(Course.difficulty == difficulty)
    if search:
        query = query.where(Course.title.ilike(f"%{search}%"))
        count_query = count_query.where(Course.title.ilike(f"%{search}%"))

    from sqlalchemy import func
    total_result = await db.execute(select(func.count()).select_from(count_query.subquery()))
    total = total_result.scalar() or 0

    offset = (page - 1) * page_size
    query = query.offset(offset).limit(page_size)
    result = await db.execute(query)
    courses = result.scalars().all()

    total_pages = (total + page_size - 1) // page_size if total > 0 else 1

    data = [
        {
            "id": c.id,
            "title": c.title,
            "description": c.description,
            "provider": c.provider,
            "source": c.source,
            "url": c.url,
            "duration_minutes": c.duration_minutes,
            "difficulty": c.difficulty,
            "language": c.language,
            "status": c.status,
            "created_at": c.created_at.isoformat() if c.created_at else None,
        }
        for c in courses
    ]

    return PaginatedResponse(
        success=True,
        message="Courses retrieved successfully",
        data=data,
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
        has_next=page < total_pages,
        has_previous=page > 1,
    )


@router.get("/{course_id}")
async def get_course(
    course_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get a specific course by its ID."""
    result = await db.execute(select(Course).where(Course.id == course_id))
    course = result.scalar_one_or_none()
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found",
        )

    return APIResponse(
        success=True,
        message="Course retrieved successfully",
        data={
            "id": course.id,
            "title": course.title,
            "description": course.description,
            "provider": course.provider,
            "source": course.source,
            "external_id": course.external_id,
            "url": course.url,
            "duration_minutes": course.duration_minutes,
            "difficulty": course.difficulty,
            "language": course.language,
            "status": course.status,
            "created_at": course.created_at.isoformat() if course.created_at else None,
            "updated_at": course.updated_at.isoformat() if course.updated_at else None,
        },
    )
