import enum


class UserRole(str, enum.Enum):
    LEARNER = "LEARNER"
    TRAINER = "TRAINER"
    ADMIN = "ADMIN"
    SUPER_ADMIN = "SUPER_ADMIN"


class CompetencyLevel(int, enum.Enum):
    BEGINNER = 1
    BASIC = 2
    INTERMEDIATE = 3
    ADVANCED = 4
    EXPERT = 5


class SkillGapPriority(str, enum.Enum):
    CRITICAL = "CRITICAL"
    HIGH = "HIGH"
    MEDIUM = "MEDIUM"
    LOW = "LOW"


class CourseSource(str, enum.Enum):
    IGOT = "IGOT"
    TPAC = "TPAC"
    INTERNAL = "INTERNAL"


class CourseStatus(str, enum.Enum):
    ACTIVE = "ACTIVE"
    INACTIVE = "INACTIVE"
    ARCHIVED = "ARCHIVED"


class LearningStatus(str, enum.Enum):
    NOT_STARTED = "NOT_STARTED"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"
    DROPPED = "DROPPED"


class AssessmentType(str, enum.Enum):
    DIAGNOSTIC = "diagnostic"
    ADAPTIVE = "adaptive"
    PRACTICE = "practice"
    CERTIFICATION = "certification"
    RECOMMENDED = "recommended"


class AssessmentStatus(str, enum.Enum):
    UPCOMING = "upcoming"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    RECOMMENDED = "recommended"


class DocumentStatus(str, enum.Enum):
    UPLOADED = "UPLOADED"
    PROCESSING = "PROCESSING"
    INDEXED = "INDEXED"
    FAILED = "FAILED"


class CompetencyDomain(str, enum.Enum):
    STATISTICAL = "STATISTICAL"
    TECHNICAL = "TECHNICAL"
    DIGITAL_GOVERNANCE = "DIGITAL_GOVERNANCE"
    BEHAVIOURAL_MANAGERIAL = "BEHAVIOURAL_MANAGERIAL"
