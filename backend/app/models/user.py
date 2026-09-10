import uuid
from datetime import datetime
from sqlalchemy import String, Integer, ForeignKey, DateTime, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    clerk_user_id: Mapped[str] = mapped_column(String(64), unique=True, nullable=False, index=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    designation: Mapped[str | None] = mapped_column(String(255))
    department_id: Mapped[str | None] = mapped_column(String(36), ForeignKey("departments.id"))
    role_id: Mapped[str] = mapped_column(String(50), nullable=False, default="LEARNER")
    organization_id: Mapped[str | None] = mapped_column(String(36), ForeignKey("organizations.id"))
    experience_years: Mapped[int | None] = mapped_column(Integer)
    education: Mapped[str | None] = mapped_column(Text)
    current_assignment: Mapped[str | None] = mapped_column(Text)
    career_goal: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    department = relationship("Department", back_populates="users")
    organization = relationship("Organization", back_populates="users")
    competencies = relationship("UserCompetency", back_populates="user")
    skill_gaps = relationship("SkillGap", back_populates="user")
    learning_progress = relationship("LearningProgress", back_populates="user")
    assessment_attempts = relationship("AssessmentAttempt", back_populates="user")
    notifications = relationship("Notification", back_populates="user")
    conversations = relationship("AIConversation", back_populates="user")
    documents = relationship("Document", back_populates="uploader")
