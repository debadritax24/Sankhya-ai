from datetime import datetime
from typing import Optional, Any
from pydantic import BaseModel, ConfigDict, Field


class AssessmentQuestionResponse(BaseModel):
    """Response schema for a single assessment question."""
    model_config = ConfigDict(from_attributes=True)

    id: str = Field(..., description="Unique question identifier")
    question_text: str = Field(..., description="The question text")
    question_type: str = Field(..., description="Question type (MCQ, TRUE_FALSE, SHORT_ANSWER, PRACTICAL)")
    options: Optional[list[dict[str, Any]]] = Field(None, description="Answer options for MCQ questions")
    competency_id: Optional[str] = Field(None, description="Related competency ID")
    competency_name: Optional[str] = Field(None, description="Related competency name")
    difficulty_level: str = Field(..., description="Question difficulty level")
    points: int = Field(default=1, ge=1, description="Points awarded for correct answer")
    explanation: Optional[str] = Field(None, description="Explanation shown after answering")
    order: int = Field(default=0, description="Question order in the assessment")


class AssessmentResponse(BaseModel):
    """Response schema for an assessment."""
    model_config = ConfigDict(from_attributes=True)

    id: str = Field(..., description="Unique assessment identifier")
    title: str = Field(..., description="Assessment title")
    description: Optional[str] = Field(None, description="Assessment description")
    assessment_type: str = Field(..., description="Assessment type (SKILL_CHECK, COURSE_QUIZ, COMPETENCY_EVALUATION)")
    competency_id: Optional[str] = Field(None, description="Related competency ID")
    competency_name: Optional[str] = Field(None, description="Related competency name")
    time_limit_minutes: Optional[int] = Field(None, ge=1, description="Time limit in minutes")
    passing_score: float = Field(..., ge=0, le=100, description="Passing score percentage")
    total_points: int = Field(..., ge=0, description="Total possible points")
    question_count: int = Field(..., ge=0, description="Number of questions")
    is_active: bool = Field(default=True, description="Whether the assessment is active")
    created_at: datetime = Field(..., description="Record creation timestamp")


class AssessmentAnswerResponse(BaseModel):
    """Response schema for a single answer in an attempt."""
    model_config = ConfigDict(from_attributes=True)

    id: str = Field(..., description="Unique answer identifier")
    question_id: str = Field(..., description="Question identifier")
    question_text: Optional[str] = Field(None, description="The question text")
    user_answer: str = Field(..., description="User's submitted answer")
    is_correct: Optional[bool] = Field(None, description="Whether the answer was correct")
    points_earned: float = Field(default=0, ge=0, description="Points earned for this answer")
    feedback: Optional[str] = Field(None, description="AI-generated feedback on the answer")


class AssessmentAttemptResponse(BaseModel):
    """Response schema for an assessment attempt."""
    model_config = ConfigDict(from_attributes=True)

    id: str = Field(..., description="Unique attempt identifier")
    user_id: str = Field(..., description="User identifier")
    assessment_id: str = Field(..., description="Assessment identifier")
    assessment_title: Optional[str] = Field(None, description="Assessment title")
    status: str = Field(..., description="Attempt status (IN_PROGRESS, COMPLETED, TIMED_OUT, ABANDONED)")
    score: Optional[float] = Field(None, ge=0, le=100, description="Score as percentage (0-100)")
    points_earned: Optional[float] = Field(None, ge=0, description="Total points earned")
    total_points: Optional[int] = Field(None, ge=0, description="Total possible points")
    passed: Optional[bool] = Field(None, description="Whether the attempt passed")
    time_taken_seconds: Optional[int] = Field(None, ge=0, description="Time taken in seconds")
    answers: list[AssessmentAnswerResponse] = Field(default_factory=list, description="Individual answers")
    started_at: datetime = Field(..., description="Attempt start timestamp")
    completed_at: Optional[datetime] = Field(None, description="Attempt completion timestamp")
    created_at: datetime = Field(..., description="Record creation timestamp")


class AssessmentSubmitRequest(BaseModel):
    """Request schema for submitting assessment answers."""
    answers: list[dict[str, str]] = Field(
        ...,
        min_length=1,
        description="List of answers, each with 'question_id' and 'answer' keys"
    )
    time_taken_seconds: Optional[int] = Field(None, ge=0, description="Total time taken in seconds")
