from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field


class SkillGapResponse(BaseModel):
    """Response schema for a detected skill gap."""
    model_config = ConfigDict(from_attributes=True)

    id: str = Field(..., description="Unique skill gap record identifier")
    user_id: str = Field(..., description="User identifier")
    competency_id: str = Field(..., description="Competency identifier")
    competency_name: str = Field(..., description="Competency name")
    domain_name: Optional[str] = Field(None, description="Domain name")
    current_level: str = Field(..., description="User's current proficiency level")
    required_level: str = Field(..., description="Required proficiency level for role")
    gap_severity: str = Field(..., description="Gap severity (LOW, MEDIUM, HIGH, CRITICAL)")
    gap_score: float = Field(..., ge=0, le=1, description="Gap score (0 = no gap, 1 = critical gap)")
    recommended_actions: list[str] = Field(default_factory=list, description="List of recommended actions")
    identified_at: datetime = Field(..., description="When the gap was identified")
    created_at: datetime = Field(..., description="Record creation timestamp")


class SkillGapList(BaseModel):
    """Response schema for a list of skill gaps."""
    model_config = ConfigDict(from_attributes=True)

    user_id: str = Field(..., description="User identifier")
    total_gaps: int = Field(..., description="Total number of skill gaps")
    critical_gaps: int = Field(default=0, description="Number of critical gaps")
    high_gaps: int = Field(default=0, description="Number of high severity gaps")
    medium_gaps: int = Field(default=0, description="Number of medium severity gaps")
    low_gaps: int = Field(default=0, description="Number of low severity gaps")
    gaps: list[SkillGapResponse] = Field(default_factory=list, description="List of skill gaps")
    overall_readiness_score: Optional[float] = Field(None, ge=0, le=100, description="Overall readiness score (0-100)")
    last_analyzed_at: Optional[datetime] = Field(None, description="Last analysis timestamp")
    created_at: datetime = Field(..., description="Record creation timestamp")
