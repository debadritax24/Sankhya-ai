"""
SANKHYA AI — Model Registry
Imports ALL model classes in dependency order so SQLAlchemy's mapper
can resolve every relationship string reference before configuration.
"""

# --- Tier 0: Base ---
from app.core.database import Base  # noqa: F401

# --- Tier 1: No FK dependencies on other models ---
from app.models.organization import Department, Organization  # noqa: F401
from app.models.competency import CompetencyDomain  # noqa: F401

# --- Tier 2: Depends only on Tier 1 ---
from app.models.user import User  # noqa: F401  (FK -> Department, Organization)
from app.models.competency import Competency, RoleCompetency  # noqa: F401  (FK -> CompetencyDomain)

# --- Tier 3: Depends on Tier 2 ---
from app.models.competency import Skill, UserCompetency, CompetencyEvidence  # noqa: F401
from app.models.skill_gap import SkillGap  # noqa: F401  (FK -> User, Skill)

# --- Tier 4: Depends on Tier 2-3 ---
from app.models.course import (  # noqa: F401
    Course,
    CourseSkill,
    LearningProgress,
    Recommendation,
    LearningPath,
)

# --- Tier 5: Assessment chain ---
from app.models.assessment import (  # noqa: F401
    Assessment,
    AssessmentQuestion,
    AssessmentAttempt,
    AssessmentAnswer,
)

# --- Tier 6: Misc (depends on User, Document chain) ---
from app.models.misc import (  # noqa: F401
    Notification,
    AIConversation,
    AIMessage,
    Document,
    DocumentChunk,
    Embedding,
    AuditLog,
    TrainingProgramme,
)

__all__ = [
    # Organization
    "Department",
    "Organization",
    # Competency
    "CompetencyDomain",
    "Competency",
    "Skill",
    "RoleCompetency",
    "UserCompetency",
    "CompetencyEvidence",
    # User
    "User",
    # Skill Gap
    "SkillGap",
    # Course
    "Course",
    "CourseSkill",
    "LearningProgress",
    "Recommendation",
    "LearningPath",
    # Assessment
    "Assessment",
    "AssessmentQuestion",
    "AssessmentAttempt",
    "AssessmentAnswer",
    # Misc
    "Notification",
    "AIConversation",
    "AIMessage",
    "Document",
    "DocumentChunk",
    "Embedding",
    "AuditLog",
    "TrainingProgramme",
]
