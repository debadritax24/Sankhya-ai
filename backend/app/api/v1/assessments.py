from datetime import datetime
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.core.security import get_current_user
from app.models import (
    User,
    Assessment,
    AssessmentQuestion,
    AssessmentAttempt,
    AssessmentAnswer,
)
from app.schemas.common import APIResponse, PaginatedResponse

router = APIRouter()


class AssessmentResponse(BaseModel):
    """Assessment response schema."""
    id: str
    title: str
    type: str
    status: str
    competency_id: Optional[str] = None
    competency_name: Optional[str] = None
    question_count: int
    duration_minutes: int
    difficulty: str
    reason: Optional[str] = None
    created_at: Optional[str] = None


class QuestionResponse(BaseModel):
    """Question response schema (without correct answer)."""
    id: str
    question: str
    options: dict
    difficulty: str
    skill_id: Optional[str] = None


class AttemptResponse(BaseModel):
    """Assessment attempt response schema."""
    id: str
    assessment_id: str
    score: Optional[float] = None
    accuracy: Optional[float] = None
    passed: Optional[bool] = None
    started_at: str
    completed_at: Optional[str] = None
    time_taken_seconds: Optional[int] = None


class SubmitAnswersRequest(BaseModel):
    """Schema for submitting assessment answers."""
    answers: list[dict] = Field(..., description="List of answers with question_id and selected_answer")
    time_taken_seconds: int = Field(..., ge=0, description="Total time taken in seconds")


@router.get("", response_model=PaginatedResponse)
async def list_assessments(
    type_filter: str | None = Query(None, alias="type", description="Filter by type"),
    status_filter: str | None = Query(None, alias="status", description="Filter by status"),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(20, ge=1, le=100, description="Items per page"),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """List all available assessments with optional filtering."""
    query = select(Assessment)
    count_query = select(Assessment)

    if type_filter:
        query = query.where(Assessment.type == type_filter.lower())
        count_query = count_query.where(Assessment.type == type_filter.lower())
    if status_filter:
        query = query.where(Assessment.status == status_filter.lower())
        count_query = count_query.where(Assessment.status == status_filter.lower())

    from sqlalchemy import func
    total_result = await db.execute(select(func.count()).select_from(count_query.subquery()))
    total = total_result.scalar() or 0

    offset = (page - 1) * page_size
    query = query.offset(offset).limit(page_size)
    result = await db.execute(query)
    assessments = result.scalars().all()

    total_pages = (total + page_size - 1) // page_size if total > 0 else 1

    data = [
        AssessmentResponse(
            id=a.id,
            title=a.title,
            type=a.type,
            status=a.status,
            competency_id=a.competency_id,
            competency_name=a.competency_name,
            question_count=a.question_count,
            duration_minutes=a.duration_minutes,
            difficulty=a.difficulty,
            reason=a.reason,
            created_at=a.created_at.isoformat() if a.created_at else None,
        )
        for a in assessments
    ]

    return PaginatedResponse(
        success=True,
        message="Assessments retrieved successfully",
        data=[item.model_dump() for item in data],
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
        has_next=page < total_pages,
        has_previous=page > 1,
    )


@router.get("/{assessment_id}")
async def get_assessment(
    assessment_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get a specific assessment by ID with questions."""
    result = await db.execute(select(Assessment).where(Assessment.id == assessment_id))
    assessment = result.scalar_one_or_none()
    if not assessment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assessment not found",
        )

    questions_result = await db.execute(
        select(AssessmentQuestion).where(AssessmentQuestion.assessment_id == assessment_id)
    )
    questions = questions_result.scalars().all()

    questions_data = [
        QuestionResponse(
            id=q.id,
            question=q.question,
            options=q.options,
            difficulty=q.difficulty,
            skill_id=q.skill_id,
        ).model_dump()
        for q in questions
    ]

    return APIResponse(
        success=True,
        message="Assessment retrieved successfully",
        data={
            "id": assessment.id,
            "title": assessment.title,
            "type": assessment.type,
            "status": assessment.status,
            "competency_id": assessment.competency_id,
            "competency_name": assessment.competency_name,
            "question_count": assessment.question_count,
            "duration_minutes": assessment.duration_minutes,
            "difficulty": assessment.difficulty,
            "reason": assessment.reason,
            "questions": questions_data,
            "created_at": assessment.created_at.isoformat() if assessment.created_at else None,
        },
    )


@router.post("/{assessment_id}/attempt", response_model=APIResponse[AttemptResponse], status_code=status.HTTP_201_CREATED)
async def start_assessment_attempt(
    assessment_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Start a new attempt for an assessment."""
    assessment_result = await db.execute(select(Assessment).where(Assessment.id == assessment_id))
    assessment = assessment_result.scalar_one_or_none()
    if not assessment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assessment not found",
        )

    now = datetime.utcnow()
    attempt = AssessmentAttempt(
        user_id=current_user.id,
        assessment_id=assessment_id,
        started_at=now,
    )

    db.add(attempt)
    await db.flush()
    await db.refresh(attempt)

    return APIResponse(
        success=True,
        message="Assessment attempt started",
        data=AttemptResponse(
            id=attempt.id,
            assessment_id=attempt.assessment_id,
            started_at=attempt.started_at.isoformat(),
        ),
    )


@router.post("/{assessment_id}/submit", response_model=APIResponse[AttemptResponse])
async def submit_assessment(
    assessment_id: str,
    submit_data: SubmitAnswersRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Submit answers for an in-progress assessment attempt."""
    attempt_result = await db.execute(
        select(AssessmentAttempt).where(
            AssessmentAttempt.assessment_id == assessment_id,
            AssessmentAttempt.user_id == current_user.id,
            AssessmentAttempt.completed_at.is_(None),
        )
    )
    attempt = attempt_result.scalar_one_or_none()
    if not attempt:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No active attempt found for this assessment",
        )

    questions_result = await db.execute(
        select(AssessmentQuestion).where(AssessmentQuestion.assessment_id == assessment_id)
    )
    questions = {q.id: q for q in questions_result.scalars().all()}

    correct_count = 0
    total_count = len(submit_data.answers)

    for answer_data in submit_data.answers:
        question_id = answer_data.get("question_id")
        selected_answer = answer_data.get("selected_answer")

        question = questions.get(question_id)
        if not question:
            continue

        is_correct = question.correct_answer == selected_answer
        if is_correct:
            correct_count += 1

        answer = AssessmentAnswer(
            attempt_id=attempt.id,
            question_id=question_id,
            selected_answer=selected_answer,
            is_correct=is_correct,
        )
        db.add(answer)

    now = datetime.utcnow()
    accuracy = (correct_count / total_count * 100) if total_count > 0 else 0.0
    attempt.score = correct_count
    attempt.accuracy = accuracy
    attempt.passed = accuracy >= 60.0
    attempt.completed_at = now
    attempt.time_taken_seconds = submit_data.time_taken_seconds

    db.add(attempt)
    await db.flush()
    await db.refresh(attempt)

    return APIResponse(
        success=True,
        message="Assessment submitted successfully",
        data=AttemptResponse(
            id=attempt.id,
            assessment_id=attempt.assessment_id,
            score=attempt.score,
            accuracy=attempt.accuracy,
            passed=attempt.passed,
            started_at=attempt.started_at.isoformat(),
            completed_at=attempt.completed_at.isoformat() if attempt.completed_at else None,
            time_taken_seconds=attempt.time_taken_seconds,
        ),
    )


@router.get("/results/{attempt_id}")
async def get_assessment_results(
    attempt_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get detailed results for a specific assessment attempt."""
    attempt_result = await db.execute(
        select(AssessmentAttempt).where(
            AssessmentAttempt.id == attempt_id,
            AssessmentAttempt.user_id == current_user.id,
        )
    )
    attempt = attempt_result.scalar_one_or_none()
    if not attempt:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Attempt not found",
        )

    answers_result = await db.execute(
        select(AssessmentAnswer).where(AssessmentAnswer.attempt_id == attempt_id)
    )
    answers = answers_result.scalars().all()

    answers_data = [
        {
            "id": a.id,
            "question_id": a.question_id,
            "selected_answer": a.selected_answer,
            "is_correct": a.is_correct,
            "time_taken_seconds": a.time_taken_seconds,
        }
        for a in answers
    ]

    return APIResponse(
        success=True,
        message="Assessment results retrieved successfully",
        data={
            "id": attempt.id,
            "assessment_id": attempt.assessment_id,
            "score": attempt.score,
            "accuracy": attempt.accuracy,
            "passed": attempt.passed,
            "started_at": attempt.started_at.isoformat(),
            "completed_at": attempt.completed_at.isoformat() if attempt.completed_at else None,
            "time_taken_seconds": attempt.time_taken_seconds,
            "answers": answers_data,
        },
    )
