from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field


class CourseResponse(BaseModel):
    """Response schema for a course."""
    model_config = ConfigDict(from_attributes=True)

    id: str = Field(..., description="Unique course identifier")
    title: str = Field(..., description="Course title")
    description: Optional[str] = Field(None, description="Course description")
    provider: str = Field(..., description="Course provider (e.g., SWAYAM, NPTEL, DIKSHA)")
    provider_url: Optional[str] = Field(None, description="URL to the course on provider platform")
    competency_id: Optional[str] = Field(None, description="Related competency ID")
    competency_name: Optional[str] = Field(None, description="Related competency name")
    domain_name: Optional[str] = Field(None, description="Related domain name")
    difficulty_level: str = Field(..., description="Course difficulty (BEGINNER, INTERMEDIATE, ADVANCED)")
    duration_hours: Optional[float] = Field(None, ge=0, description="Estimated duration in hours")
    language: str = Field(default="English", description="Course language")
    is_free: bool = Field(default=True, description="Whether the course is free")
    rating: Optional[float] = Field(None, ge=0, le=5, description="Average rating (0-5)")
    enrollment_count: int = Field(default=0, description="Number of enrolled learners")
    tags: list[str] = Field(default_factory=list, description="Course tags for filtering")
    thumbnail_url: Optional[str] = Field(None, description="Course thumbnail URL")
    created_at: datetime = Field(..., description="Record creation timestamp")


class CourseList(BaseModel):
    """Response schema for a paginated list of courses."""
    courses: list[CourseResponse] = Field(default_factory=list, description="List of courses")
    total: int = Field(..., description="Total number of courses matching filters")
    page: int = Field(..., description="Current page number")
    page_size: int = Field(..., description="Items per page")
    has_next: bool = Field(..., description="Whether there is a next page")


class CourseCreate(BaseModel):
    """Schema for creating a new course."""
    title: str = Field(..., min_length=1, max_length=200, description="Course title")
    description: Optional[str] = Field(None, description="Course description")
    provider: str = Field(..., min_length=1, description="Course provider")
    provider_url: Optional[str] = Field(None, description="URL to the course on provider platform")
    competency_id: Optional[str] = Field(None, description="Related competency ID")
    difficulty_level: str = Field(..., description="Course difficulty level")
    duration_hours: Optional[float] = Field(None, ge=0, description="Estimated duration in hours")
    language: str = Field(default="English", description="Course language")
    is_free: bool = Field(default=True, description="Whether the course is free")
    tags: list[str] = Field(default_factory=list, description="Course tags")
    thumbnail_url: Optional[str] = Field(None, description="Course thumbnail URL")


class LearningProgressResponse(BaseModel):
    """Response schema for a user's learning progress on a course."""
    model_config = ConfigDict(from_attributes=True)

    id: str = Field(..., description="Unique progress record identifier")
    user_id: str = Field(..., description="User identifier")
    course_id: str = Field(..., description="Course identifier")
    course_title: Optional[str] = Field(None, description="Course title")
    status: str = Field(..., description="Progress status (NOT_STARTED, IN_PROGRESS, COMPLETED, DROPPED)")
    progress_percentage: float = Field(default=0, ge=0, le=100, description="Completion percentage (0-100)")
    time_spent_minutes: int = Field(default=0, ge=0, description="Total time spent in minutes")
    last_accessed_at: Optional[datetime] = Field(None, description="Last access timestamp")
    completed_at: Optional[datetime] = Field(None, description="Completion timestamp")
    certificate_url: Optional[str] = Field(None, description="Certificate download URL")
    created_at: datetime = Field(..., description="Record creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")
