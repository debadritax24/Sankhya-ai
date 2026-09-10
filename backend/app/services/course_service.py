from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models import Course, CourseSkill


class CourseService:
    """Service for course listing, retrieval, and search."""

    @staticmethod
    async def get_courses(
        db: AsyncSession,
        filters: dict | None = None,
    ) -> list[Course]:
        """Return courses with optional filters (provider, difficulty, status, language)."""
        stmt = select(Course).options(selectinload(Course.course_skills))
        filters = filters or {}
        if "provider" in filters:
            stmt = stmt.where(Course.provider == filters["provider"])
        if "difficulty" in filters:
            stmt = stmt.where(Course.difficulty == filters["difficulty"])
        if "status" in filters:
            stmt = stmt.where(Course.status == filters["status"])
        if "language" in filters:
            stmt = stmt.where(Course.language == filters["language"])
        stmt = stmt.order_by(Course.title)
        result = await db.execute(stmt)
        return list(result.scalars().all())

    @staticmethod
    async def get_by_id(db: AsyncSession, course_id: str) -> Course | None:
        """Return a single course with skills loaded."""
        result = await db.execute(
            select(Course)
            .options(selectinload(Course.course_skills).selectinload(CourseSkill.skill))
            .where(Course.id == course_id)
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def search_courses(db: AsyncSession, query: str) -> list[Course]:
        """Search courses by title or description (case-insensitive contains)."""
        pattern = f"%{query}%"
        result = await db.execute(
            select(Course)
            .options(selectinload(Course.course_skills))
            .where(Course.title.ilike(pattern) | Course.description.ilike(pattern))
            .order_by(Course.title)
        )
        return list(result.scalars().all())
