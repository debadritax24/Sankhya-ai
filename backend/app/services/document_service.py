import uuid
from datetime import datetime
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import Document


class DocumentService:
    """Service for document upload and management."""

    @staticmethod
    async def upload_document(
        db: AsyncSession,
        file: dict,
        user_id: str,
    ) -> Document:
        """Create a Document record from an uploaded file.

        The `file` dict is expected to contain:
            - filename: str
            - mime_type: str
            - storage_key: str (path/key in object storage)
            - size_bytes: int
        """
        document = Document(
            filename=file["filename"],
            mime_type=file.get("mime_type", "application/octet-stream"),
            storage_key=file["storage_key"],
            size_bytes=file.get("size_bytes", 0),
            status="UPLOADED",
            uploaded_by=user_id,
        )
        db.add(document)
        await db.flush()
        await db.refresh(document)
        return document

    @staticmethod
    async def get_by_id(db: AsyncSession, document_id: str) -> Document | None:
        """Return a single document by ID."""
        result = await db.execute(select(Document).where(Document.id == document_id))
        return result.scalar_one_or_none()

    @staticmethod
    async def update_status(db: AsyncSession, document_id: str, status: str) -> None:
        """Update the processing status of a document."""
        result = await db.execute(select(Document).where(Document.id == document_id))
        document = result.scalar_one_or_none()
        if document is None:
            raise ValueError(f"Document {document_id} not found")
        document.status = status
        document.updated_at = datetime.utcnow()
        await db.flush()
