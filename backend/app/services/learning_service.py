from datetime import datetime
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models import Course, LearningProgress


class LearningService:
    """Service for tracking learning progress and generating recommendations."""

    @staticmethod
    async def get_progress(db: AsyncSession, user_id: str) -> list[LearningProgress]:
        """Return all learning progress records for a user with course loaded."""
        result = await db.execute(
            select(LearningProgress)
            .options(selectinload(LearningProgress.course))
            .where(LearningProgress.user_id == user_id)
            .order_by(LearningProgress.last_activity_at.desc())
        )
        return list(result.scalars().all())

    @staticmethod
    async def update_progress(
        db: AsyncSession,
        user_id: str,
        course_id: str,
        data: dict,
    ) -> LearningProgress:
        """Update or create a learning progress record for a user-course pair."""
        result = await db.execute(
            select(LearningProgress).where(
                LearningProgress.user_id == user_id,
                LearningProgress.course_id == course_id,
            )
        )
        lp = result.scalar_one_or_none()
        if lp is None:
            lp = LearningProgress(user_id=user_id, course_id=course_id, **data)
            db.add(lp)
        else:
            for field, value in data.items():
                if hasattr(lp, field) and value is not None:
                    setattr(lp, field, value)
            lp.last_activity_at = datetime.utcnow()
        await db.flush()
        await db.refresh(lp)
        return lp

    @staticmethod
    async def get_recommendations(db: AsyncSession, user_id: str) -> list[dict]:
        """Return recommended courses for a user based on their skill gaps.

        Finds skill gaps with HIGH/MEDIUM priority, then returns courses
        that address those skills ordered by gap score descending.
        """
        from app.models import SkillGap, CourseSkill

        result = await db.execute(
            select(SkillGap)
            .where(
                SkillGap.user_id == user_id,
                SkillGap.priority.in_(["HIGH", "MEDIUM"]),
            )
            .order_by(SkillGap.gap_score.desc())
        )
        skill_gaps = result.scalars().all()
        if not skill_gaps:
            return []

        gap_skill_ids = [sg.skill_id for sg in skill_gaps]
        course_result = await db.execute(
            select(Course, CourseSkill.relevance_score)
            .join(CourseSkill, Course.id == CourseSkill.course_id)
            .where(CourseSkill.skill_id.in_(gap_skill_ids), Course.status == "ACTIVE")
            .order_by(CourseSkill.relevance_score.desc())
        )
        rows = course_result.all()
        seen: set[str] = set()
        recommendations: list[dict] = []
        for course, relevance in rows:
            if course.id in seen:
                continue
            seen.add(course.id)
            recommendations.append({
                "course_id": course.id,
                "title": course.title,
                "provider": course.provider,
                "relevance_score": relevance,
            })
        return recommendations
