from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field


class NotificationResponse(BaseModel):
    """Response schema for a user notification."""
    model_config = ConfigDict(from_attributes=True)

    id: str = Field(..., description="Unique notification identifier")
    user_id: str = Field(..., description="User identifier")
    title: str = Field(..., description="Notification title")
    message: str = Field(..., description="Notification message body")
    notification_type: str = Field(
        ...,
        description="Notification type (SKILL_UPDATE, COURSE_RECOMMENDATION, ASSESSMENT_RESULT, SYSTEM, REMINDER)"
    )
    priority: str = Field(default="NORMAL", description="Notification priority (LOW, NORMAL, HIGH, URGENT)")
    is_read: bool = Field(default=False, description="Whether the notification has been read")
    action_url: Optional[str] = Field(None, description="URL to navigate to when notification is clicked")
    related_resource_id: Optional[str] = Field(None, description="ID of related resource")
    related_resource_type: Optional[str] = Field(None, description="Type of related resource")
    read_at: Optional[datetime] = Field(None, description="When the notification was read")
    created_at: datetime = Field(..., description="Notification creation timestamp")
