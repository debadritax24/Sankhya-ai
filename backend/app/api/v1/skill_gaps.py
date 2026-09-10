from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.core.security import get_current_user
from app.models import User, SkillGap
from app.schemas.common import APIResponse, PaginatedResponse

router = APIRouter()


@router.get("", response_model=PaginatedResponse)
async def list_skill_gaps(
    priority: str | None = Query(None, description="Filter by priority (CRITICAL, HIGH, MEDIUM, LOW)"),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(20, ge=1, le=100, description="Items per page"),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """List skill gaps for the authenticated user with optional priority filtering."""
    query = select(SkillGap).where(SkillGap.user_id == current_user.id)
    count_query = select(SkillGap).where(SkillGap.user_id == current_user.id)

    if priority:
        query = query.where(SkillGap.priority == priority.upper())
        count_query = count_query.where(SkillGap.priority == priority.upper())

    from sqlalchemy import func
    total_result = await db.execute(select(func.count()).select_from(count_query.subquery()))
    total = total_result.scalar() or 0

    offset = (page - 1) * page_size
    query = query.offset(offset).limit(page_size)
    result = await db.execute(query)
    skill_gaps = result.scalars().all()

    total_pages = (total + page_size - 1) // page_size if total > 0 else 1

    data = [
        {
            "id": sg.id,
            "skill_id": sg.skill_id,
            "current_level": sg.current_level,
            "required_level": sg.required_level,
            "gap_score": sg.gap_score,
            "priority": sg.priority,
            "reason": sg.reason,
            "created_at": sg.created_at.isoformat() if sg.created_at else None,
            "updated_at": sg.updated_at.isoformat() if sg.updated_at else None,
        }
        for sg in skill_gaps
    ]

    return PaginatedResponse(
        success=True,
        message="Skill gaps retrieved successfully",
        data=data,
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
        has_next=page < total_pages,
        has_previous=page > 1,
    )


@router.get("/{skill_id}")
async def get_skill_gap(
    skill_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get the skill gap for a specific skill for the authenticated user."""
    result = await db.execute(
        select(SkillGap).where(
            SkillGap.user_id == current_user.id,
            SkillGap.skill_id == skill_id,
        )
    )
    skill_gap = result.scalar_one_or_none()
    if not skill_gap:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Skill gap not found",
        )

    return APIResponse(
        success=True,
        message="Skill gap retrieved successfully",
        data={
            "id": skill_gap.id,
            "skill_id": skill_gap.skill_id,
            "current_level": skill_gap.current_level,
            "required_level": skill_gap.required_level,
            "gap_score": skill_gap.gap_score,
            "priority": skill_gap.priority,
            "reason": skill_gap.reason,
            "created_at": skill_gap.created_at.isoformat() if skill_gap.created_at else None,
            "updated_at": skill_gap.updated_at.isoformat() if skill_gap.updated_at else None,
        },
    )
