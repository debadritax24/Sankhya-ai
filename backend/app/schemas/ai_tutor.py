from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field


class ConversationCreate(BaseModel):
    """Request schema for creating a new AI tutor conversation."""
    title: Optional[str] = Field(None, max_length=200, description="Conversation title")
    competency_id: Optional[str] = Field(None, description="Related competency ID for focused help")
    initial_message: Optional[str] = Field(None, description="Optional first message to start the conversation")


class MessageCreate(BaseModel):
    """Request schema for sending a message in a conversation."""
    content: str = Field(..., min_length=1, max_length=4000, description="Message content")
    role: str = Field(default="user", description="Message role (user or system)")


class MessageResponse(BaseModel):
    """Response schema for a conversation message."""
    model_config = ConfigDict(from_attributes=True)

    id: str = Field(..., description="Unique message identifier")
    conversation_id: str = Field(..., description="Parent conversation identifier")
    role: str = Field(..., description="Message role (user, assistant, system)")
    content: str = Field(..., description="Message content")
    tokens_used: Optional[int] = Field(None, ge=0, description="Number of tokens used")
    model_used: Optional[str] = Field(None, description="AI model used for generation")
    created_at: datetime = Field(..., description="Message creation timestamp")


class ConversationResponse(BaseModel):
    """Response schema for an AI tutor conversation."""
    model_config = ConfigDict(from_attributes=True)

    id: str = Field(..., description="Unique conversation identifier")
    user_id: str = Field(..., description="User identifier")
    title: Optional[str] = Field(None, description="Conversation title")
    competency_id: Optional[str] = Field(None, description="Related competency ID")
    competency_name: Optional[str] = Field(None, description="Related competency name")
    status: str = Field(default="ACTIVE", description="Conversation status (ACTIVE, ARCHIVED, DELETED)")
    message_count: int = Field(default=0, description="Number of messages in conversation")
    last_message_at: Optional[datetime] = Field(None, description="Timestamp of last message")
    created_at: datetime = Field(..., description="Conversation creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")
