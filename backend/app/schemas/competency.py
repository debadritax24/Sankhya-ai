from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field


class CompetencyDomainResponse(BaseModel):
    """Response schema for a competency domain."""
    model_config = ConfigDict(from_attributes=True)

    id: str = Field(..., description="Unique domain identifier")
    name: str = Field(..., description="Domain name (e.g., Data Analysis, GIS)")
    description: Optional[str] = Field(None, description="Domain description")
    icon: Optional[str] = Field(None, description="Domain icon identifier")
    color: Optional[str] = Field(None, description="Domain theme color")
    created_at: datetime = Field(..., description="Creation timestamp")


class SkillResponse(BaseModel):
    """Response schema for a single skill."""
    model_config = ConfigDict(from_attributes=True)

    id: str = Field(..., description="Unique skill identifier")
    name: str = Field(..., description="Skill name")
    description: Optional[str] = Field(None, description="Skill description")
    domain_id: str = Field(..., description="Parent competency domain ID")
    domain_name: Optional[str] = Field(None, description="Parent domain name")
    difficulty_level: str = Field(..., description="Skill difficulty (BEGINNER, INTERMEDIATE, ADVANCED)")
    is_core: bool = Field(default=False, description="Whether this is a core required skill")
    created_at: datetime = Field(..., description="Creation timestamp")


class CompetencyResponse(BaseModel):
    """Response schema for a competency with its skills."""
    model_config = ConfigDict(from_attributes=True)

    id: str = Field(..., description="Unique competency identifier")
    name: str = Field(..., description="Competency name")
    description: Optional[str] = Field(None, description="Competency description")
    domain: CompetencyDomainResponse = Field(..., description="Parent competency domain")
    skills: list[SkillResponse] = Field(default_factory=list, description="Skills in this competency")
    created_at: datetime = Field(..., description="Creation timestamp")


class UserCompetencyResponse(BaseModel):
    """Response schema for a user's competency assessment."""
    model_config = ConfigDict(from_attributes=True)

    id: str = Field(..., description="Unique record identifier")
    user_id: str = Field(..., description="User identifier")
    competency_id: str = Field(..., description="Competency identifier")
    competency_name: Optional[str] = Field(None, description="Competency name")
    domain_name: Optional[str] = Field(None, description="Domain name")
    current_level: str = Field(..., description="Current proficiency level (BEGINNER, INTERMEDIATE, ADVANCED, EXPERT)")
    target_level: Optional[str] = Field(None, description="Target proficiency level")
    assessment_score: Optional[float] = Field(None, ge=0, le=100, description="Last assessment score (0-100)")
    confidence_score: Optional[float] = Field(None, ge=0, le=1, description="AI confidence in assessment (0-1)")
    last_assessed_at: Optional[datetime] = Field(None, description="Last assessment timestamp")
    created_at: datetime = Field(..., description="Record creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")


class UserCompetencyUpdate(BaseModel):
    """Schema for updating a user's competency level."""
    target_level: Optional[str] = Field(None, description="New target proficiency level")
    assessment_score: Optional[float] = Field(None, ge=0, le=100, description="Updated assessment score")
    notes: Optional[str] = Field(None, description="Notes about the competency update")


class CompetencySummary(BaseModel):
    """Compact competency summary for embedded references."""
    model_config = ConfigDict(from_attributes=True)

    id: str = Field(..., description="Unique competency identifier")
    name: str = Field(..., description="Competency name")
    domain_name: Optional[str] = Field(None, description="Domain name")
    current_level: Optional[str] = Field(None, description="Current proficiency level")
    assessment_score: Optional[float] = Field(None, description="Last assessment score")
