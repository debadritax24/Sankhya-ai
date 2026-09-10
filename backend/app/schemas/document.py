from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field


class DocumentUploadResponse(BaseModel):
    """Response schema after a document is uploaded."""
    model_config = ConfigDict(from_attributes=True)

    id: str = Field(..., description="Unique document identifier")
    filename: str = Field(..., description="Original filename")
    file_url: str = Field(..., description="URL to access the uploaded file")
    file_size_bytes: int = Field(..., ge=0, description="File size in bytes")
    mime_type: str = Field(..., description="MIME type of the file")
    upload_status: str = Field(..., description="Upload status (PENDING, PROCESSING, COMPLETED, FAILED)")
    created_at: datetime = Field(..., description="Upload timestamp")


class DocumentResponse(BaseModel):
    """Full response schema for a document."""
    model_config = ConfigDict(from_attributes=True)

    id: str = Field(..., description="Unique document identifier")
    user_id: str = Field(..., description="Owner user identifier")
    filename: str = Field(..., description="Original filename")
    file_url: str = Field(..., description="URL to access the file")
    file_size_bytes: int = Field(..., ge=0, description="File size in bytes")
    mime_type: str = Field(..., description="MIME type of the file")
    document_type: str = Field(
        ...,
        description="Document type (RESUME, CERTIFICATE, TRANSCRIPT, PORTFOLIO, OTHER)"
    )
    processing_status: str = Field(
        ...,
        description="Processing status (PENDING, EXTRACTING, INDEXED, FAILED)"
    )
    extracted_text: Optional[str] = Field(None, description="Extracted text content (if processed)")
    tags: list[str] = Field(default_factory=list, description="Document tags")
    is_verified: bool = Field(default=False, description="Whether the document has been verified")
    verified_at: Optional[datetime] = Field(None, description="Verification timestamp")
    created_at: datetime = Field(..., description="Record creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")
