from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.core.security import get_current_user
from app.models import User, Document
from app.schemas.common import APIResponse

router = APIRouter()


@router.post("/upload", response_model=APIResponse, status_code=status.HTTP_201_CREATED)
async def upload_document(
    file: UploadFile = File(..., description="Document file to upload"),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Upload a document for AI-powered processing and indexing."""
    allowed_types = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
        "text/csv",
    ]

    if file.content_type and file.content_type not in allowed_types:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File type '{file.content_type}' is not supported. Allowed types: PDF, DOCX, DOC, TXT, CSV",
        )

    content = await file.read()
    max_size = 50 * 1024 * 1024  # 50MB
    if len(content) > max_size:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File size exceeds 50MB limit",
        )

    storage_key = f"documents/{current_user.id}/{file.filename}"

    document = Document(
        filename=file.filename or "untitled",
        mime_type=file.content_type or "application/octet-stream",
        storage_key=storage_key,
        size_bytes=len(content),
        status="UPLOADED",
        uploaded_by=current_user.id,
    )

    db.add(document)
    await db.flush()
    await db.refresh(document)

    return APIResponse(
        success=True,
        message="Document uploaded successfully. Processing will begin shortly.",
        data={
            "id": document.id,
            "filename": document.filename,
            "mime_type": document.mime_type,
            "size_bytes": document.size_bytes,
            "status": document.status,
            "created_at": document.created_at.isoformat() if document.created_at else None,
        },
    )


@router.get("/{document_id}")
async def get_document(
    document_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get document metadata and processing status by ID."""
    result = await db.execute(
        select(Document).where(
            Document.id == document_id,
            Document.uploaded_by == current_user.id,
        )
    )
    document = result.scalar_one_or_none()
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found",
        )

    return APIResponse(
        success=True,
        message="Document retrieved successfully",
        data={
            "id": document.id,
            "filename": document.filename,
            "mime_type": document.mime_type,
            "storage_key": document.storage_key,
            "size_bytes": document.size_bytes,
            "status": document.status,
            "created_at": document.created_at.isoformat() if document.created_at else None,
            "updated_at": document.updated_at.isoformat() if document.updated_at else None,
        },
    )
