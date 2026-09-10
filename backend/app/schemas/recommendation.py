from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field


class RecommendationResponse(BaseModel):
    """Response schema for an AI-generated learning recommendation."""
    model_config = ConfigDict(from_attributes=True)

    id: str = Field(..., description="Unique recommendation identifier")
    user_id: str = Field(..., description="User identifier")
    recommendation_type: str = Field(
        ...,
        description="Recommendation type (COURSE, ASSESSMENT, SKILL_DEVELOPMENT, LEARNING_PATH)"
    )
    title: str = Field(..., description="Recommendation title")
    description: Optional[str] = Field(None, description="Recommendation description")
    competency_id: Optional[str] = Field(None, description="Related competency ID")
    competency_name: Optional[str] = Field(None, description="Related competency name")
    resource_id: Optional[str] = Field(None, description="ID of the recommended resource")
    resource_type: Optional[str] = Field(None, description="Type of resource (course, assessment, etc.)")
    resource_url: Optional[str] = Field(None, description="URL to the recommended resource")
    priority: str = Field(..., description="Recommendation priority (LOW, MEDIUM, HIGH, URGENT)")
    relevance_score: float = Field(..., ge=0, le=1, description="AI relevance score (0-1)")
    reasoning: Optional[str] = Field(None, description="AI reasoning for this recommendation")
    estimated_duration_minutes: Optional[int] = Field(None, ge=0, description="Estimated time to complete")
    is_viewed: bool = Field(default=False, description="Whether the user has viewed this recommendation")
    is_completed: bool = Field(default=False, description="Whether the user completed this recommendation")
    generated_at: datetime = Field(..., description="When the recommendation was generated")
    expires_at: Optional[datetime] = Field(None, description="When the recommendation expires")
    created_at: datetime = Field(..., description="Record creation timestamp")
