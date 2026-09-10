from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field


class CompetencyDomainAnalytics(BaseModel):
    """Analytics breakdown by competency domain."""
    model_config = ConfigDict(from_attributes=True)

    domain_id: str = Field(..., description="Competency domain identifier")
    domain_name: str = Field(..., description="Domain name")
    total_learners: int = Field(default=0, ge=0, description="Number of learners in this domain")
    average_score: Optional[float] = Field(None, ge=0, le=100, description="Average score across domain (0-100)")
    average_readiness: Optional[float] = Field(None, ge=0, le=100, description="Average readiness score (0-100)")
    top_skills: list[str] = Field(default_factory=list, description="Top performing skills in domain")
    gap_skills: list[str] = Field(default_factory=list, description="Skills with largest gaps in domain")
    completion_rate: Optional[float] = Field(None, ge=0, le=100, description="Course completion rate (0-100)")


class LearnerAnalyticsResponse(BaseModel):
    """Analytics response for an individual learner."""
    model_config = ConfigDict(from_attributes=True)

    user_id: str = Field(..., description="User identifier")
    overall_readiness_score: Optional[float] = Field(None, ge=0, le=100, description="Overall readiness score (0-100)")
    total_competencies: int = Field(default=0, ge=0, description="Total competencies assessed")
    competencies_mastered: int = Field(default=0, ge=0, description="Number of competencies at target level")
    competencies_in_progress: int = Field(default=0, ge=0, description="Competencies currently being developed")
    total_courses_enrolled: int = Field(default=0, ge=0, description="Total courses enrolled")
    courses_completed: int = Field(default=0, ge=0, description="Total courses completed")
    total_assessments_taken: int = Field(default=0, ge=0, description="Total assessments taken")
    average_assessment_score: Optional[float] = Field(None, ge=0, le=100, description="Average assessment score (0-100)")
    learning_hours: float = Field(default=0, ge=0, description="Total learning hours logged")
    current_streak_days: int = Field(default=0, ge=0, description="Current learning streak in days")
    longest_streak_days: int = Field(default=0, ge=0, description="Longest learning streak in days")
    domain_breakdown: list[CompetencyDomainAnalytics] = Field(
        default_factory=list,
        description="Analytics breakdown by competency domain"
    )
    recent_activity: list[dict[str, str]] = Field(
        default_factory=list,
        description="Recent learning activity entries"
    )
    generated_at: datetime = Field(..., description="When the analytics were generated")


class AdminAnalyticsResponse(BaseModel):
    """Analytics response for admin dashboard — organization-wide metrics."""
    model_config = ConfigDict(from_attributes=True)

    total_learners: int = Field(default=0, ge=0, description="Total registered learners")
    active_learners_30d: int = Field(default=0, ge=0, description="Active learners in last 30 days")
    total_competencies: int = Field(default=0, ge=0, description="Total competencies in system")
    average_org_readiness: Optional[float] = Field(None, ge=0, le=100, description="Organization average readiness (0-100)")
    average_org_assessment_score: Optional[float] = Field(None, ge=0, le=100, description="Organization average assessment score (0-100)")
    total_courses_completed: int = Field(default=0, ge=0, description="Total courses completed across org")
    course_completion_rate: Optional[float] = Field(None, ge=0, le=100, description="Overall course completion rate (0-100)")
    total_assessments_taken: int = Field(default=0, ge=0, description="Total assessments taken across org")
    department_breakdown: list[dict[str, str]] = Field(
        default_factory=list,
        description="Analytics breakdown by department"
    )
    domain_analytics: list[CompetencyDomainAnalytics] = Field(
        default_factory=list,
        description="Analytics breakdown by competency domain"
    )
    top_skill_gaps: list[dict[str, str]] = Field(
        default_factory=list,
        description="Most common skill gaps across the organization"
    )
    generated_at: datetime = Field(..., description="When the analytics were generated")
