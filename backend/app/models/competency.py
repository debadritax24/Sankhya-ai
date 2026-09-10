import uuid
from datetime import datetime
from sqlalchemy import String, Integer, ForeignKey, DateTime, Text, Float
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base


class CompetencyDomain(Base):
    __tablename__ = "competency_domains"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    code: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    description: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    competencies = relationship("Competency", back_populates="domain")


class Competency(Base):
    __tablename__ = "competencies"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    domain_id: Mapped[str] = mapped_column(String(36), ForeignKey("competency_domains.id"))
    description: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    domain = relationship("CompetencyDomain", back_populates="competencies")
    skills = relationship("Skill", back_populates="competency")
    user_competencies = relationship("UserCompetency", back_populates="competency")
    role_competencies = relationship("RoleCompetency", back_populates="competency")


class Skill(Base):
    __tablename__ = "skills"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    competency_id: Mapped[str] = mapped_column(String(36), ForeignKey("competencies.id"))
    description: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    competency = relationship("Competency", back_populates="skills")
    course_skills = relationship("CourseSkill", back_populates="skill")


class RoleCompetency(Base):
    __tablename__ = "role_competencies"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    role_id: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    competency_id: Mapped[str] = mapped_column(String(36), ForeignKey("competencies.id"))
    required_level: Mapped[int] = mapped_column(Integer, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    competency = relationship("Competency", back_populates="role_competencies")


class UserCompetency(Base):
    __tablename__ = "user_competencies"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id"), index=True)
    competency_id: Mapped[str] = mapped_column(String(36), ForeignKey("competencies.id"), index=True)
    current_level: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
    target_level: Mapped[int] = mapped_column(Integer, nullable=False, default=3)
    confidence: Mapped[float] = mapped_column(Float, default=0.5)
    last_assessed_at: Mapped[datetime | None] = mapped_column(DateTime)
    source: Mapped[str | None] = mapped_column(String(50))
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="competencies")
    competency = relationship("Competency", back_populates="user_competencies")


class CompetencyEvidence(Base):
    __tablename__ = "competency_evidence"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_competency_id: Mapped[str] = mapped_column(String(36), ForeignKey("user_competencies.id"))
    evidence_type: Mapped[str] = mapped_column(String(50))
    description: Mapped[str | None] = mapped_column(Text)
    source: Mapped[str | None] = mapped_column(String(255))
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
