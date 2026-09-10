from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import (
    Assessment,
    AssessmentAttempt,
    UserCompetency,
    Course,
    LearningProgress,
    SkillGap,
    User,
)


class AnalyticsService:
    """Service for learner and admin analytics aggregation."""

    @staticmethod
    async def get_learner_analytics(db: AsyncSession, user_id: str) -> dict:
        """Return analytics for a single learner.

        Includes competency stats, skill gap counts, learning progress summary,
        and assessment performance.
        """
        uc_result = await db.execute(
            select(UserCompetency).where(UserCompetency.user_id == user_id)
        )
        user_competencies = uc_result.scalars().all()
        avg_level = (
            sum(uc.current_level for uc in user_competencies) / len(user_competencies)
            if user_competencies
            else 0.0
        )

        gap_result = await db.execute(
            select(
                SkillGap.priority,
                func.count(SkillGap.id),
            )
            .where(SkillGap.user_id == user_id)
            .group_by(SkillGap.priority)
        )
        gap_counts = {row[0]: row[1] for row in gap_result.all()}

        lp_result = await db.execute(
            select(LearningProgress).where(LearningProgress.user_id == user_id)
        )
        progress_list = lp_result.scalars().all()
        total_courses = len(progress_list)
        completed_courses = sum(1 for lp in progress_list if lp.status == "COMPLETED")
        in_progress_courses = sum(1 for lp in progress_list if lp.status == "IN_PROGRESS")
        total_learning_minutes = sum(lp.learning_minutes for lp in progress_list)

        attempt_result = await db.execute(
            select(AssessmentAttempt)
            .where(AssessmentAttempt.user_id == user_id, AssessmentAttempt.completed_at.isnot(None))
        )
        attempts = attempt_result.scalars().all()
        avg_score = (
            sum(a.score for a in attempts if a.score is not None) / len(attempts)
            if attempts
            else 0.0
        )
        pass_rate = (
            sum(1 for a in attempts if a.passed) / len(attempts)
            if attempts
            else 0.0
        )

        return {
            "competencies": {
                "total": len(user_competencies),
                "average_level": round(avg_level, 2),
            },
            "skill_gaps": gap_counts,
            "learning": {
                "total_courses": total_courses,
                "completed": completed_courses,
                "in_progress": in_progress_courses,
                "total_learning_minutes": total_learning_minutes,
            },
            "assessments": {
                "attempts": len(attempts),
                "average_score": round(avg_score, 2),
                "pass_rate": round(pass_rate, 4),
            },
        }

    @staticmethod
    async def get_admin_analytics(db: AsyncSession) -> dict:
        """Return platform-wide analytics for admin dashboards."""
        user_count = (await db.execute(select(func.count(User.id)))).scalar() or 0
        course_count = (await db.execute(select(func.count(Course.id)))).scalar() or 0

        assessment_count = (await db.execute(select(func.count(Assessment.id)))).scalar() or 0
        attempt_result = await db.execute(
            select(
                func.count(AssessmentAttempt.id),
                func.avg(AssessmentAttempt.score),
            )
            .where(AssessmentAttempt.completed_at.isnot(None))
        )
        attempt_row = attempt_result.one()
        total_attempts = attempt_row[0] or 0
        avg_score = float(attempt_row[1] or 0.0)

        gap_result = await db.execute(
            select(SkillGap.priority, func.count(SkillGap.id)).group_by(SkillGap.priority)
        )
        gap_summary = {row[0]: row[1] for row in gap_result.all()}

        lp_result = await db.execute(select(LearningProgress))
        all_progress = lp_result.scalars().all()
        completion_rate = (
            sum(1 for lp in all_progress if lp.status == "COMPLETED") / len(all_progress)
            if all_progress
            else 0.0
        )

        return {
            "users": user_count,
            "courses": course_count,
            "assessments": assessment_count,
            "total_attempts": total_attempts,
            "average_score": round(avg_score, 2),
            "skill_gaps": gap_summary,
            "completion_rate": round(completion_rate, 4),
        }
