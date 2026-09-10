from datetime import datetime
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models import (
    Assessment,
    AssessmentAnswer,
    AssessmentAttempt,
    AssessmentQuestion,
)


class AssessmentService:
    """Service for assessments, attempts, and scoring."""

    @staticmethod
    async def get_assessments(
        db: AsyncSession,
        filters: dict | None = None,
    ) -> list[Assessment]:
        """Return assessments with optional filters (type, status, difficulty)."""
        stmt = select(Assessment)
        filters = filters or {}
        if "type" in filters:
            stmt = stmt.where(Assessment.type == filters["type"])
        if "status" in filters:
            stmt = stmt.where(Assessment.status == filters["status"])
        if "difficulty" in filters:
            stmt = stmt.where(Assessment.difficulty == filters["difficulty"])
        if "competency_id" in filters:
            stmt = stmt.where(Assessment.competency_id == filters["competency_id"])
        stmt = stmt.order_by(Assessment.created_at.desc())
        result = await db.execute(stmt)
        return list(result.scalars().all())

    @staticmethod
    async def get_by_id(db: AsyncSession, assessment_id: str) -> Assessment | None:
        """Return a single assessment with questions loaded."""
        result = await db.execute(
            select(Assessment)
            .options(selectinload(Assessment.questions))
            .where(Assessment.id == assessment_id)
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def create_attempt(
        db: AsyncSession,
        user_id: str,
        assessment_id: str,
    ) -> AssessmentAttempt:
        """Create a new assessment attempt for a user."""
        attempt = AssessmentAttempt(
            user_id=user_id,
            assessment_id=assessment_id,
        )
        db.add(attempt)
        await db.flush()
        await db.refresh(attempt)
        return attempt

    @staticmethod
    async def submit_attempt(
        db: AsyncSession,
        attempt_id: str,
        answers: list[dict],
    ) -> AssessmentAttempt:
        """Submit answers for an attempt, compute score, and return the updated attempt.

        Each answer dict must contain: question_id (str), selected_answer (int),
        and optionally time_taken_seconds (int).
        """
        result = await db.execute(
            select(AssessmentAttempt)
            .options(selectinload(AssessmentAttempt.assessment).selectinload(Assessment.questions))
            .where(AssessmentAttempt.id == attempt_id)
        )
        attempt = result.scalar_one_or_none()
        if attempt is None:
            raise ValueError(f"Attempt {attempt_id} not found")
        if attempt.completed_at is not None:
            raise ValueError(f"Attempt {attempt_id} already completed")

        questions_map = {q.id: q for q in attempt.assessment.questions}
        correct = 0
        total = len(answers)

        for ans_data in answers:
            question = questions_map.get(ans_data["question_id"])
            if question is None:
                continue
            is_correct = ans_data["selected_answer"] == question.correct_answer
            if is_correct:
                correct += 1
            answer = AssessmentAnswer(
                attempt_id=attempt_id,
                question_id=ans_data["question_id"],
                selected_answer=ans_data["selected_answer"],
                is_correct=is_correct,
                time_taken_seconds=ans_data.get("time_taken_seconds"),
            )
            db.add(answer)

        accuracy = correct / total if total > 0 else 0.0
        score = accuracy * 100.0
        attempt.score = score
        attempt.accuracy = accuracy
        attempt.passed = score >= 60.0
        attempt.completed_at = datetime.utcnow()
        total_time = sum(a.get("time_taken_seconds", 0) or 0 for a in answers)
        attempt.time_taken_seconds = total_time if total_time > 0 else None
        await db.flush()
        await db.refresh(attempt)
        return attempt

    @staticmethod
    async def update_competency_from_result(
        db: AsyncSession,
        user_id: str,
        assessment_id: str,
        score: float,
    ) -> None:
        """Update the user's competency level based on assessment score.

        Uses a simple mapping: score 0-39 -> level 1, 40-59 -> level 2,
        60-79 -> level 3, 80-89 -> level 4, 90-100 -> level 5.
        """
        from app.services.competency_service import CompetencyService

        result = await db.execute(
            select(Assessment.competency_id).where(Assessment.id == assessment_id)
        )
        competency_id = result.scalar_one_or_none()
        if competency_id is None:
            return

        if score >= 90:
            level = 5
        elif score >= 80:
            level = 4
        elif score >= 60:
            level = 3
        elif score >= 40:
            level = 2
        else:
            level = 1

        await CompetencyService.update_user_competency(
            db, user_id, competency_id,
            {"current_level": level, "last_assessed_at": datetime.utcnow(), "source": "assessment"},
        )
