from datetime import datetime
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.core.security import get_current_user
from app.models import User, AIConversation, AIMessage
from app.schemas.common import APIResponse
from app.ai.rag import ask_question_with_rag

router = APIRouter()


class ConversationCreate(BaseModel):
    """Schema for creating a new AI conversation."""
    title: Optional[str] = Field(None, description="Conversation title")


class MessageCreate(BaseModel):
    """Schema for sending a message in a conversation."""
    content: str = Field(..., min_length=1, max_length=10000, description="Message content")


class ConversationResponse(BaseModel):
    """Schema for conversation response."""
    id: str
    title: Optional[str] = None
    created_at: str
    updated_at: Optional[str] = None


class MessageResponse(BaseModel):
    """Schema for message response."""
    id: str
    role: str
    content: str
    sources: Optional[dict] = None
    created_at: str


@router.post("/conversations", response_model=APIResponse[ConversationResponse], status_code=status.HTTP_201_CREATED)
async def create_conversation(
    conversation_data: ConversationCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Start a new conversation with the AI Learning Copilot."""
    now = datetime.utcnow()
    conversation = AIConversation(
        user_id=current_user.id,
        title=conversation_data.title,
        created_at=now,
        updated_at=now,
    )

    db.add(conversation)
    await db.flush()
    await db.refresh(conversation)

    return APIResponse(
        success=True,
        message="Conversation created successfully",
        data=ConversationResponse(
            id=conversation.id,
            title=conversation.title,
            created_at=conversation.created_at.isoformat(),
            updated_at=conversation.updated_at.isoformat() if conversation.updated_at else None,
        ),
    )


@router.post("/conversations/{conversation_id}/messages", response_model=APIResponse[MessageResponse], status_code=status.HTTP_201_CREATED)
async def send_message(
    conversation_id: str,
    message_data: MessageCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Send a message in an existing conversation and receive an AI response."""
    conv_result = await db.execute(
        select(AIConversation).where(
            AIConversation.id == conversation_id,
            AIConversation.user_id == current_user.id,
        )
    )
    conversation = conv_result.scalar_one_or_none()
    if not conversation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Conversation not found",
        )

    # 1. Save User Message
    user_message = AIMessage(
        conversation_id=conversation_id,
        role="user",
        content=message_data.content,
    )
    db.add(user_message)

    try:
        # 2. Query the RAG Engine directly
        ai_response_content = await ask_question_with_rag(db, message_data.content)
    except Exception as e:
        ai_response_content = "I'm sorry, my systems are currently unavailable. Please check that LLM API keys are configured correctly."
        print(f"RAG Error: {e}")

    # 3. Save AI Message
    ai_message = AIMessage(
        conversation_id=conversation_id,
        role="assistant",
        content=ai_response_content,
        sources={"engine": "pgvector_rag", "status": "retrieved"},
    )
    db.add(ai_message)

    conversation.updated_at = datetime.utcnow()
    db.add(conversation)

    await db.flush()
    await db.refresh(ai_message)

    return APIResponse(
        success=True,
        message="Message sent successfully",
        data=MessageResponse(
            id=ai_message.id,
            role=ai_message.role,
            content=ai_message.content,
            sources=ai_message.sources,
            created_at=ai_message.created_at.isoformat(),
        ),
    )


@router.get("/conversations/{conversation_id}")
async def get_conversation(
    conversation_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get a conversation with all its messages."""
    conv_result = await db.execute(
        select(AIConversation).where(
            AIConversation.id == conversation_id,
            AIConversation.user_id == current_user.id,
        )
    )
    conversation = conv_result.scalar_one_or_none()
    if not conversation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Conversation not found",
        )

    messages_result = await db.execute(
        select(AIMessage)
        .where(AIMessage.conversation_id == conversation_id)
        .order_by(AIMessage.created_at)
    )
    messages = messages_result.scalars().all()

    messages_data = [
        MessageResponse(
            id=m.id,
            role=m.role,
            content=m.content,
            sources=m.sources,
            created_at=m.created_at.isoformat(),
        ).model_dump()
        for m in messages
    ]

    return APIResponse(
        success=True,
        message="Conversation retrieved successfully",
        data={
            "id": conversation.id,
            "title": conversation.title,
            "created_at": conversation.created_at.isoformat(),
            "updated_at": conversation.updated_at.isoformat() if conversation.updated_at else None,
            "messages": messages_data,
        },
    )
