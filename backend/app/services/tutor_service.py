from datetime import datetime
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models import AIConversation, AIMessage


class TutorService:
    """Service for managing AI tutor conversations and messages."""

    @staticmethod
    async def create_conversation(
        db: AsyncSession,
        user_id: str,
        title: str | None = None,
    ) -> AIConversation:
        """Create a new AI conversation for a user."""
        conversation = AIConversation(user_id=user_id, title=title)
        db.add(conversation)
        await db.flush()
        await db.refresh(conversation)
        return conversation

    @staticmethod
    async def get_conversation(db: AsyncSession, conversation_id: str) -> AIConversation | None:
        """Return a single conversation."""
        result = await db.execute(
            select(AIConversation).where(AIConversation.id == conversation_id)
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def get_messages(db: AsyncSession, conversation_id: str) -> list[AIMessage]:
        """Return all messages in a conversation ordered by creation time."""
        result = await db.execute(
            select(AIMessage)
            .where(AIMessage.conversation_id == conversation_id)
            .order_by(AIMessage.created_at)
        )
        return list(result.scalars().all())

    @staticmethod
    async def send_message(
        db: AsyncSession,
        conversation_id: str,
        content: str,
    ) -> AIMessage:
        """Persist a user message in a conversation.

        The actual LLM response generation is handled by the API layer or a
        background task; this method only stores the message record.
        """
        user_message = AIMessage(
            conversation_id=conversation_id,
            role="user",
            content=content,
        )
        db.add(user_message)
        conversation_result = await db.execute(
            select(AIConversation).where(AIConversation.id == conversation_id)
        )
        conversation = conversation_result.scalar_one_or_none()
        if conversation is not None:
            conversation.updated_at = datetime.utcnow()
        await db.flush()
        await db.refresh(user_message)
        return user_message
