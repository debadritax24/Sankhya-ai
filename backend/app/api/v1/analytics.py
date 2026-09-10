from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.core.database import get_db
from app.core.security import get_current_user, require_admin
from app.models import User, UserCompetency, SkillGap, LearningProgress, AssessmentAttempt
from app.schemas.common import APIResponse

router = APIRouter()


@router.get("/learner")
async def get_learner_analytics(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get analytics dashboard data for the authenticated learner."""
    competencies_result = await db.execute(
        select(func.count()).where(UserCompetency.user_id == current_user.id)
    )
    total_competencies = competencies_result.scalar() or 0

    avg_level_result = await db.execute(
        select(func.avg(UserCompetency.current_level)).where(
            UserCompetency.user_id == current_user.id
        )
    )
    avg_level = avg_level_result.scalar() or 0.0

    gaps_result = await db.execute(
        select(func.count()).where(SkillGap.user_id == current_user.id)
    )
    total_gaps = gaps_result.scalar() or 0

    critical_gaps_result = await db.execute(
        select(func.count()).where(
            SkillGap.user_id == current_user.id,
            SkillGap.priority == "CRITICAL",
        )
    )
    critical_gaps = critical_gaps_result.scalar() or 0

    progress_result = await db.execute(
        select(func.count()).where(LearningProgress.user_id == current_user.id)
    )
    total_courses = progress_result.scalar() or 0

    completed_result = await db.execute(
        select(func.count()).where(
            LearningProgress.user_id == current_user.id,
            LearningProgress.status == "COMPLETED",
        )
    )
    completed_courses = completed_result.scalar() or 0

    assessments_result = await db.execute(
        select(func.count()).where(AssessmentAttempt.user_id == current_user.id)
    )
    total_assessments = assessments_result.scalar() or 0

    avg_accuracy_result = await db.execute(
        select(func.avg(AssessmentAttempt.accuracy)).where(
            AssessmentAttempt.user_id == current_user.id,
            AssessmentAttempt.completed_at.isnot(None),
        )
    )
    avg_accuracy = avg_accuracy_result.scalar() or 0.0

    return APIResponse(
        success=True,
        message="Learner analytics retrieved successfully",
        data={
            "competencies": {
                "total": total_competencies,
                "average_level": round(float(avg_level), 2),
            },
            "skill_gaps": {
                "total": total_gaps,
                "critical": critical_gaps,
            },
            "learning": {
                "total_courses": total_courses,
                "completed_courses": completed_courses,
                "completion_rate": round((completed_courses / total_courses * 100) if total_courses > 0 else 0, 2),
            },
            "assessments": {
                "total_attempted": total_assessments,
                "average_accuracy": round(float(avg_accuracy), 2),
            },
        },
    )


@router.get("/admin")
async def get_admin_analytics(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    """Get organization-wide analytics dashboard data (admin only)."""
    total_users_result = await db.execute(select(func.count()).select_from(User))
    total_users = total_users_result.scalar() or 0

    active_users_result = await db.execute(
        select(func.count()).select_from(User).where(User.role_id.isnot(None))
    )
    active_users = active_users_result.scalar() or 0

    competencies_result = await db.execute(
        select(func.avg(UserCompetency.current_level))
    )
    org_avg_level = competencies_result.scalar() or 0.0

    gaps_result = await db.execute(select(func.count()).select_from(SkillGap))
    total_gaps = gaps_result.scalar() or 0

    critical_gaps_result = await db.execute(
        select(func.count()).select_from(SkillGap).where(SkillGap.priority == "CRITICAL")
    )
    critical_gaps = critical_gaps_result.scalar() or 0

    progress_result = await db.execute(select(func.count()).select_from(LearningProgress))
    total_progress = progress_result.scalar() or 0

    completed_result = await db.execute(
        select(func.count()).select_from(LearningProgress).where(
            LearningProgress.status == "COMPLETED"
        )
    )
    completed = completed_result.scalar() or 0

    assessments_result = await db.execute(
        select(func.count()).select_from(AssessmentAttempt).where(
            AssessmentAttempt.completed_at.isnot(None)
        )
    )
    total_assessments = assessments_result.scalar() or 0

    avg_accuracy_result = await db.execute(
        select(func.avg(AssessmentAttempt.accuracy)).where(
            AssessmentAttempt.completed_at.isnot(None)
        )
    )
    avg_accuracy = avg_accuracy_result.scalar() or 0.0

    return APIResponse(
        success=True,
        message="Admin analytics retrieved successfully",
        data={
            "users": {
                "total": total_users,
                "active": active_users,
            },
            "competencies": {
                "organization_average_level": round(float(org_avg_level), 2),
            },
            "skill_gaps": {
                "total": total_gaps,
                "critical": critical_gaps,
            },
            "learning": {
                "total_enrollments": total_progress,
                "completions": completed,
                "completion_rate": round((completed / total_progress * 100) if total_progress > 0 else 0, 2),
            },
            "assessments": {
                "total_completed": total_assessments,
                "average_accuracy": round(float(avg_accuracy), 2),
            },
        },
    )
