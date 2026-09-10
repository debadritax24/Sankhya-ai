import uuid
from datetime import datetime
from sqlalchemy import String, ForeignKey, DateTime, Text, Float, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base


class SkillGap(Base):
    __tablename__ = "skill_gaps"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id"), index=True)
    skill_id: Mapped[str] = mapped_column(String(36), ForeignKey("skills.id"), index=True)
    current_level: Mapped[int] = mapped_column(Integer, nullable=False)
    required_level: Mapped[int] = mapped_column(Integer, nullable=False)
    gap_score: Mapped[float] = mapped_column(Float, nullable=False)
    priority: Mapped[str] = mapped_column(String(20), nullable=False, index=True)
    reason: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="skill_gaps")
    skill = relationship("Skill")
