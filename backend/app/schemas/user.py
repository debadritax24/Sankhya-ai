from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field


class UserBase(BaseModel):
    """Base user schema with shared fields."""
    email: str = Field(..., description="User's email address")
    full_name: str = Field(..., description="User's full name")
    phone: Optional[str] = Field(None, description="User's phone number")
    department: Optional[str] = Field(None, description="User's government department")
    designation: Optional[str] = Field(None, description="User's job designation")
    location: Optional[str] = Field(None, description="User's work location")


class UserCreate(UserBase):
    """Schema for creating a new user."""
    clerk_id: str = Field(..., description="Clerk authentication ID")
    role: str = Field(default="LEARNER", description="User role (LEARNER, TRAINER, ADMIN, SUPER_ADMIN)")


class UserUpdate(BaseModel):
    """Schema for updating user information."""
    full_name: Optional[str] = Field(None, description="Updated full name")
    phone: Optional[str] = Field(None, description="Updated phone number")
    department: Optional[str] = Field(None, description="Updated department")
    designation: Optional[str] = Field(None, description="Updated designation")
    location: Optional[str] = Field(None, description="Updated location")
    avatar_url: Optional[str] = Field(None, description="Updated avatar URL")


class UserResponse(UserBase):
    """Full user response schema."""
    model_config = ConfigDict(from_attributes=True)

    id: str = Field(..., description="Unique user identifier")
    clerk_id: str = Field(..., description="Clerk authentication ID")
    avatar_url: Optional[str] = Field(None, description="User's avatar URL")
    role: str = Field(..., description="User's role")
    is_active: bool = Field(default=True, description="Whether the user account is active")
    last_login: Optional[datetime] = Field(None, description="Last login timestamp")
    created_at: datetime = Field(..., description="Account creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")


class UserSummary(BaseModel):
    """Compact user summary for embedded references."""
    model_config = ConfigDict(from_attributes=True)

    id: str = Field(..., description="Unique user identifier")
    full_name: str = Field(..., description="User's full name")
    email: str = Field(..., description="User's email address")
    avatar_url: Optional[str] = Field(None, description="User's avatar URL")
    department: Optional[str] = Field(None, description="User's department")
    role: str = Field(..., description="User's role")
