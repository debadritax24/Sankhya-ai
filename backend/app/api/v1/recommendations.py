from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.core.security import get_current_user
from app.models import User, Recommendation
from app.schemas.common import APIResponse

router = APIRouter()


@router.get("")
async def get_recommendations(
    limit: int = Query(10, ge=1, le=50, description="Maximum number of recommendations"),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get personalized course recommendations for the authenticated user."""
    result = await db.execute(
        select(Recommendation)
        .where(Recommendation.user_id == current_user.id)
        .order_by(Recommendation.rank)
        .limit(limit)
    )
    recommendations = result.scalars().all()

    data = [
        {
            "id": r.id,
            "course_id": r.course_id,
            "skill_gap_id": r.skill_gap_id,
            "rank": r.rank,
            "reason": r.reason,
            "score": r.score,
            "created_at": r.created_at.isoformat() if r.created_at else None,
        }
        for r in recommendations
    ]

    return APIResponse(
        success=True,
        message="Recommendations retrieved successfully",
        data=data,
    )
