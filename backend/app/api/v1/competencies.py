from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.core.security import get_current_user
from app.models import User, Competency, CompetencyDomain, Skill, UserCompetency
from app.schemas.common import APIResponse, PaginatedResponse

router = APIRouter()


class CompetencyResponse:
    """Competency response schema."""
    pass


class SkillResponse:
    """Skill response schema."""
    pass


class UserCompetencyResponse:
    """User competency response schema."""
    pass


@router.get("", response_model=PaginatedResponse)
async def list_competencies(
    domain_id: str | None = Query(None, description="Filter by domain ID"),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(20, ge=1, le=100, description="Items per page"),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """List all competencies with optional domain filtering."""
    query = select(Competency)
    if domain_id:
        query = query.where(Competency.domain_id == domain_id)

    count_query = select(Competency)
    if domain_id:
        count_query = count_query.where(Competency.domain_id == domain_id)

    from sqlalchemy import func
    total_result = await db.execute(select(func.count()).select_from(count_query.subquery()))
    total = total_result.scalar() or 0

    offset = (page - 1) * page_size
    query = query.offset(offset).limit(page_size)
    result = await db.execute(query)
    competencies = result.scalars().all()

    total_pages = (total + page_size - 1) // page_size if total > 0 else 1

    data = [
        {
            "id": c.id,
            "name": c.name,
            "domain_id": c.domain_id,
            "description": c.description,
            "created_at": c.created_at.isoformat() if c.created_at else None,
        }
        for c in competencies
    ]

    return PaginatedResponse(
        success=True,
        message="Competencies retrieved successfully",
        data=data,
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
        has_next=page < total_pages,
        has_previous=page > 1,
    )


@router.get("/{competency_id}")
async def get_competency(
    competency_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get a specific competency by ID."""
    result = await db.execute(select(Competency).where(Competency.id == competency_id))
    competency = result.scalar_one_or_none()
    if not competency:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Competency not found",
        )

    return APIResponse(
        success=True,
        message="Competency retrieved successfully",
        data={
            "id": competency.id,
            "name": competency.name,
            "domain_id": competency.domain_id,
            "description": competency.description,
            "created_at": competency.created_at.isoformat() if competency.created_at else None,
        },
    )


@router.get("/{competency_id}/skills")
async def get_competency_skills(
    competency_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get all skills under a specific competency."""
    comp_result = await db.execute(select(Competency).where(Competency.id == competency_id))
    competency = comp_result.scalar_one_or_none()
    if not competency:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Competency not found",
        )

    result = await db.execute(select(Skill).where(Skill.competency_id == competency_id))
    skills = result.scalars().all()

    data = [
        {
            "id": s.id,
            "name": s.name,
            "competency_id": s.competency_id,
            "description": s.description,
            "created_at": s.created_at.isoformat() if s.created_at else None,
        }
        for s in skills
    ]

    return APIResponse(
        success=True,
        message="Skills retrieved successfully",
        data=data,
    )


@router.get("/me/competencies")
async def get_my_competencies(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get the authenticated user's competency profile with levels."""
    result = await db.execute(
        select(UserCompetency).where(UserCompetency.user_id == current_user.id)
    )
    user_competencies = result.scalars().all()

    data = [
        {
            "id": uc.id,
            "competency_id": uc.competency_id,
            "current_level": uc.current_level,
            "target_level": uc.target_level,
            "confidence": uc.confidence,
            "last_assessed_at": uc.last_assessed_at.isoformat() if uc.last_assessed_at else None,
            "source": uc.source,
        }
        for uc in user_competencies
    ]

    return APIResponse(
        success=True,
        message="User competencies retrieved successfully",
        data=data,
    )


@router.put("/me/competencies/{competency_id}")
async def update_my_competency(
    competency_id: str,
    level: int = Query(..., ge=1, le=5, description="New competency level (1-5)"),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Update the authenticated user's level for a specific competency."""
    result = await db.execute(
        select(UserCompetency).where(
            UserCompetency.user_id == current_user.id,
            UserCompetency.competency_id == competency_id,
        )
    )
    user_competency = result.scalar_one_or_none()
    if not user_competency:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Competency not found for this user",
        )

    user_competency.current_level = level
    db.add(user_competency)
    await db.flush()
    await db.refresh(user_competency)

    return APIResponse(
        success=True,
        message="Competency level updated successfully",
        data={
            "id": user_competency.id,
            "competency_id": user_competency.competency_id,
            "current_level": user_competency.current_level,
            "target_level": user_competency.target_level,
            "confidence": user_competency.confidence,
        },
    )
