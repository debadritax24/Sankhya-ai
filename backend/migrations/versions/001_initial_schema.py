"""Initial schema — all tables, pgvector extension, and indexes

Revision ID: 001
Revises: None
Create Date: 2026-09-11

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = "001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # -----------------------------------------------------------------------
    # pgvector extension
    # -----------------------------------------------------------------------
    op.execute("CREATE EXTENSION IF NOT EXISTS vector")

    # -----------------------------------------------------------------------
    # competency_domains
    # -----------------------------------------------------------------------
    op.create_table(
        "competency_domains",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("name", sa.String(100), unique=True, nullable=False),
        sa.Column("code", sa.String(50), unique=True, nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
    )

    # -----------------------------------------------------------------------
    # departments
    # -----------------------------------------------------------------------
    op.create_table(
        "departments",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("name", sa.String(255), unique=True, nullable=False),
        sa.Column("code", sa.String(50), unique=True, nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
    )

    # -----------------------------------------------------------------------
    # organizations
    # -----------------------------------------------------------------------
    op.create_table(
        "organizations",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("name", sa.String(255), unique=True, nullable=False),
        sa.Column("code", sa.String(50), unique=True, nullable=False),
        sa.Column("parent_id", sa.String(36), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
    )

    # -----------------------------------------------------------------------
    # competencies
    # -----------------------------------------------------------------------
    op.create_table(
        "competencies",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("name", sa.String(255), nullable=False),
        sa.Column("domain_id", sa.String(36), sa.ForeignKey("competency_domains.id"), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
    )

    # -----------------------------------------------------------------------
    # skills
    # -----------------------------------------------------------------------
    op.create_table(
        "skills",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("name", sa.String(255), nullable=False),
        sa.Column("competency_id", sa.String(36), sa.ForeignKey("competencies.id"), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
    )

    # -----------------------------------------------------------------------
    # users
    # -----------------------------------------------------------------------
    op.create_table(
        "users",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("clerk_user_id", sa.String(64), unique=True, nullable=False),
        sa.Column("email", sa.String(255), unique=True, nullable=False),
        sa.Column("name", sa.String(255), nullable=False),
        sa.Column("designation", sa.String(255), nullable=True),
        sa.Column("department_id", sa.String(36), sa.ForeignKey("departments.id"), nullable=True),
        sa.Column("role_id", sa.String(50), nullable=False, server_default="LEARNER"),
        sa.Column("organization_id", sa.String(36), sa.ForeignKey("organizations.id"), nullable=True),
        sa.Column("experience_years", sa.Integer(), nullable=True),
        sa.Column("education", sa.Text(), nullable=True),
        sa.Column("current_assignment", sa.Text(), nullable=True),
        sa.Column("career_goal", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
    )
    op.create_index("ix_users_clerk_user_id", "users", ["clerk_user_id"])
    op.create_index("ix_users_email", "users", ["email"])

    # -----------------------------------------------------------------------
    # role_competencies
    # -----------------------------------------------------------------------
    op.create_table(
        "role_competencies",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("role_id", sa.String(50), nullable=False),
        sa.Column("competency_id", sa.String(36), sa.ForeignKey("competencies.id"), nullable=False),
        sa.Column("required_level", sa.Integer(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
    )
    op.create_index("ix_role_competencies_role_id", "role_competencies", ["role_id"])

    # -----------------------------------------------------------------------
    # user_competencies
    # -----------------------------------------------------------------------
    op.create_table(
        "user_competencies",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("user_id", sa.String(36), sa.ForeignKey("users.id"), nullable=False),
        sa.Column("competency_id", sa.String(36), sa.ForeignKey("competencies.id"), nullable=False),
        sa.Column("current_level", sa.Integer(), nullable=False, server_default="1"),
        sa.Column("target_level", sa.Integer(), nullable=False, server_default="3"),
        sa.Column("confidence", sa.Float(), nullable=False, server_default="0.5"),
        sa.Column("last_assessed_at", sa.DateTime(), nullable=True),
        sa.Column("source", sa.String(50), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
    )
    op.create_index("ix_user_competencies_user_id", "user_competencies", ["user_id"])
    op.create_index("ix_user_competencies_competency_id", "user_competencies", ["competency_id"])

    # -----------------------------------------------------------------------
    # competency_evidence
    # -----------------------------------------------------------------------
    op.create_table(
        "competency_evidence",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("user_competency_id", sa.String(36), sa.ForeignKey("user_competencies.id"), nullable=False),
        sa.Column("evidence_type", sa.String(50), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("source", sa.String(255), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
    )

    # -----------------------------------------------------------------------
    # skill_gaps
    # -----------------------------------------------------------------------
    op.create_table(
        "skill_gaps",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("user_id", sa.String(36), sa.ForeignKey("users.id"), nullable=False),
        sa.Column("skill_id", sa.String(36), sa.ForeignKey("skills.id"), nullable=False),
        sa.Column("current_level", sa.Integer(), nullable=False),
        sa.Column("required_level", sa.Integer(), nullable=False),
        sa.Column("gap_score", sa.Float(), nullable=False),
        sa.Column("priority", sa.String(20), nullable=False),
        sa.Column("reason", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
    )
    op.create_index("ix_skill_gaps_user_id", "skill_gaps", ["user_id"])
    op.create_index("ix_skill_gaps_skill_id", "skill_gaps", ["skill_id"])
    op.create_index("ix_skill_gaps_priority", "skill_gaps", ["priority"])

    # -----------------------------------------------------------------------
    # courses
    # -----------------------------------------------------------------------
    op.create_table(
        "courses",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("title", sa.String(500), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("provider", sa.String(100), nullable=False),
        sa.Column("source", sa.String(50), nullable=False),
        sa.Column("external_id", sa.String(255), nullable=True),
        sa.Column("url", sa.Text(), nullable=True),
        sa.Column("duration_minutes", sa.Integer(), nullable=True),
        sa.Column("difficulty", sa.String(20), nullable=True),
        sa.Column("language", sa.String(50), nullable=True, server_default="en"),
        sa.Column("status", sa.String(20), nullable=False, server_default="ACTIVE"),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
    )
    op.create_index("ix_courses_source", "courses", ["source"])
    op.create_index("ix_courses_status", "courses", ["status"])

    # -----------------------------------------------------------------------
    # course_skills
    # -----------------------------------------------------------------------
    op.create_table(
        "course_skills",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("course_id", sa.String(36), sa.ForeignKey("courses.id"), nullable=False),
        sa.Column("skill_id", sa.String(36), sa.ForeignKey("skills.id"), nullable=False),
        sa.Column("relevance_score", sa.Float(), nullable=False, server_default="1.0"),
    )
    op.create_index("ix_course_skills_course_id", "course_skills", ["course_id"])
    op.create_index("ix_course_skills_skill_id", "course_skills", ["skill_id"])

    # -----------------------------------------------------------------------
    # learning_progress
    # -----------------------------------------------------------------------
    op.create_table(
        "learning_progress",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("user_id", sa.String(36), sa.ForeignKey("users.id"), nullable=False),
        sa.Column("course_id", sa.String(36), sa.ForeignKey("courses.id"), nullable=False),
        sa.Column("status", sa.String(20), nullable=False, server_default="NOT_STARTED"),
        sa.Column("progress_percentage", sa.Float(), nullable=False, server_default="0.0"),
        sa.Column("started_at", sa.DateTime(), nullable=True),
        sa.Column("completed_at", sa.DateTime(), nullable=True),
        sa.Column("learning_minutes", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("last_activity_at", sa.DateTime(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
    )
    op.create_index("ix_learning_progress_user_id", "learning_progress", ["user_id"])
    op.create_index("ix_learning_progress_course_id", "learning_progress", ["course_id"])
    op.create_index("ix_learning_progress_status", "learning_progress", ["status"])
    op.create_index("ix_learning_progress_last_activity_at", "learning_progress", ["last_activity_at"])

    # -----------------------------------------------------------------------
    # recommendations
    # -----------------------------------------------------------------------
    op.create_table(
        "recommendations",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("user_id", sa.String(36), sa.ForeignKey("users.id"), nullable=False),
        sa.Column("course_id", sa.String(36), sa.ForeignKey("courses.id"), nullable=False),
        sa.Column("skill_gap_id", sa.String(36), sa.ForeignKey("skill_gaps.id"), nullable=True),
        sa.Column("rank", sa.Integer(), nullable=False),
        sa.Column("reason", sa.Text(), nullable=True),
        sa.Column("score", sa.Float(), nullable=False, server_default="0.0"),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
    )
    op.create_index("ix_recommendations_user_id", "recommendations", ["user_id"])

    # -----------------------------------------------------------------------
    # learning_paths
    # -----------------------------------------------------------------------
    op.create_table(
        "learning_paths",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("user_id", sa.String(36), sa.ForeignKey("users.id"), nullable=False),
        sa.Column("title", sa.String(500), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("course_ids", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
    )
    op.create_index("ix_learning_paths_user_id", "learning_paths", ["user_id"])

    # -----------------------------------------------------------------------
    # assessments
    # -----------------------------------------------------------------------
    op.create_table(
        "assessments",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("title", sa.String(500), nullable=False),
        sa.Column("type", sa.String(50), nullable=False),
        sa.Column("status", sa.String(20), nullable=False, server_default="upcoming"),
        sa.Column("competency_id", sa.String(36), sa.ForeignKey("competencies.id"), nullable=True),
        sa.Column("competency_name", sa.String(255), nullable=True),
        sa.Column("question_count", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("duration_minutes", sa.Integer(), nullable=False, server_default="30"),
        sa.Column("difficulty", sa.String(20), nullable=False, server_default="Medium"),
        sa.Column("reason", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
    )

    # -----------------------------------------------------------------------
    # assessment_questions
    # -----------------------------------------------------------------------
    op.create_table(
        "assessment_questions",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("assessment_id", sa.String(36), sa.ForeignKey("assessments.id"), nullable=False),
        sa.Column("question", sa.Text(), nullable=False),
        sa.Column("options", sa.JSON(), nullable=False),
        sa.Column("correct_answer", sa.Integer(), nullable=False),
        sa.Column("explanation", sa.Text(), nullable=True),
        sa.Column("difficulty", sa.String(20), nullable=False, server_default="Medium"),
        sa.Column("skill_id", sa.String(36), sa.ForeignKey("skills.id"), nullable=True),
        sa.Column("source_document_id", sa.String(36), nullable=True),
        sa.Column("confidence", sa.Float(), nullable=False, server_default="0.5"),
        sa.Column("status", sa.String(20), nullable=False, server_default="pending"),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
    )
    op.create_index("ix_assessment_questions_assessment_id", "assessment_questions", ["assessment_id"])

    # -----------------------------------------------------------------------
    # assessment_attempts
    # -----------------------------------------------------------------------
    op.create_table(
        "assessment_attempts",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("user_id", sa.String(36), sa.ForeignKey("users.id"), nullable=False),
        sa.Column("assessment_id", sa.String(36), sa.ForeignKey("assessments.id"), nullable=False),
        sa.Column("score", sa.Float(), nullable=True),
        sa.Column("accuracy", sa.Float(), nullable=True),
        sa.Column("passed", sa.Boolean(), nullable=True),
        sa.Column("started_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.Column("completed_at", sa.DateTime(), nullable=True),
        sa.Column("time_taken_seconds", sa.Integer(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
    )
    op.create_index("ix_assessment_attempts_user_id", "assessment_attempts", ["user_id"])
    op.create_index("ix_assessment_attempts_assessment_id", "assessment_attempts", ["assessment_id"])

    # -----------------------------------------------------------------------
    # assessment_answers
    # -----------------------------------------------------------------------
    op.create_table(
        "assessment_answers",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("attempt_id", sa.String(36), sa.ForeignKey("assessment_attempts.id"), nullable=False),
        sa.Column("question_id", sa.String(36), sa.ForeignKey("assessment_questions.id"), nullable=False),
        sa.Column("selected_answer", sa.Integer(), nullable=False),
        sa.Column("is_correct", sa.Boolean(), nullable=False),
        sa.Column("time_taken_seconds", sa.Integer(), nullable=True),
    )
    op.create_index("ix_assessment_answers_attempt_id", "assessment_answers", ["attempt_id"])

    # -----------------------------------------------------------------------
    # notifications
    # -----------------------------------------------------------------------
    op.create_table(
        "notifications",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("user_id", sa.String(36), sa.ForeignKey("users.id"), nullable=False),
        sa.Column("title", sa.String(500), nullable=False),
        sa.Column("message", sa.Text(), nullable=True),
        sa.Column("type", sa.String(50), nullable=False),
        sa.Column("read", sa.Boolean(), nullable=False, server_default="false"),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
    )
    op.create_index("ix_notifications_user_id", "notifications", ["user_id"])

    # -----------------------------------------------------------------------
    # ai_conversations
    # -----------------------------------------------------------------------
    op.create_table(
        "ai_conversations",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("user_id", sa.String(36), sa.ForeignKey("users.id"), nullable=False),
        sa.Column("title", sa.String(500), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
    )
    op.create_index("ix_ai_conversations_user_id", "ai_conversations", ["user_id"])

    # -----------------------------------------------------------------------
    # ai_messages
    # -----------------------------------------------------------------------
    op.create_table(
        "ai_messages",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("conversation_id", sa.String(36), sa.ForeignKey("ai_conversations.id"), nullable=False),
        sa.Column("role", sa.String(20), nullable=False),
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("sources", sa.JSON(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
    )
    op.create_index("ix_ai_messages_conversation_id", "ai_messages", ["conversation_id"])

    # -----------------------------------------------------------------------
    # documents
    # -----------------------------------------------------------------------
    op.create_table(
        "documents",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("filename", sa.String(500), nullable=False),
        sa.Column("mime_type", sa.String(100), nullable=True),
        sa.Column("storage_key", sa.String(500), nullable=True),
        sa.Column("size_bytes", sa.Integer(), nullable=True),
        sa.Column("status", sa.String(20), nullable=False, server_default="UPLOADED"),
        sa.Column("uploaded_by", sa.String(36), sa.ForeignKey("users.id"), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
    )
    op.create_index("ix_documents_status", "documents", ["status"])

    # -----------------------------------------------------------------------
    # document_chunks
    # -----------------------------------------------------------------------
    op.create_table(
        "document_chunks",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("document_id", sa.String(36), sa.ForeignKey("documents.id"), nullable=False),
        sa.Column("chunk_index", sa.Integer(), nullable=False),
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("metadata", sa.JSON(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
    )
    op.create_index("ix_document_chunks_document_id", "document_chunks", ["document_id"])

    # -----------------------------------------------------------------------
    # embeddings (with pgvector)
    # -----------------------------------------------------------------------
    op.execute("CREATE EXTENSION IF NOT EXISTS vector")
    op.create_table(
        "embeddings",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("chunk_id", sa.String(36), sa.ForeignKey("document_chunks.id"), unique=True, nullable=False),
        sa.Column("model", sa.String(100), nullable=False),
        sa.Column("dimension", sa.Integer(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
    )
    # Add vector column via raw SQL (1536-dim for text-embedding-3-small)
    op.execute(
        "ALTER TABLE embeddings ADD COLUMN IF NOT EXISTS vector_1536 vector(1536)"
    )
    # Create HNSW index on the vector column for fast approximate nearest-neighbour search
    op.execute(
        "CREATE INDEX IF NOT EXISTS ix_embeddings_vector_1536 "
        "ON embeddings USING hnsw (vector_1536 vector_cosine_ops)"
    )

    # -----------------------------------------------------------------------
    # audit_logs
    # -----------------------------------------------------------------------
    op.create_table(
        "audit_logs",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("user_id", sa.String(36), nullable=True),
        sa.Column("action", sa.String(100), nullable=False),
        sa.Column("resource_type", sa.String(100), nullable=True),
        sa.Column("resource_id", sa.String(36), nullable=True),
        sa.Column("details", sa.JSON(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
    )
    op.create_index("ix_audit_logs_user_id", "audit_logs", ["user_id"])

    # -----------------------------------------------------------------------
    # training_programmes
    # -----------------------------------------------------------------------
    op.create_table(
        "training_programmes",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("title", sa.String(500), nullable=False),
        sa.Column("provider", sa.String(100), nullable=True),
        sa.Column("external_id", sa.String(255), nullable=True),
        sa.Column("url", sa.Text(), nullable=True),
        sa.Column("duration_minutes", sa.Integer(), nullable=True),
        sa.Column("language", sa.String(50), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
    )


def downgrade() -> None:
    # Drop tables in reverse dependency order
    op.drop_table("training_programmes")
    op.drop_table("audit_logs")
    op.drop_index("ix_embeddings_vector_1536", table_name="embeddings")
    op.drop_table("embeddings")
    op.drop_table("document_chunks")
    op.drop_table("documents")
    op.drop_table("ai_messages")
    op.drop_table("ai_conversations")
    op.drop_table("notifications")
    op.drop_table("assessment_answers")
    op.drop_table("assessment_attempts")
    op.drop_table("assessment_questions")
    op.drop_table("assessments")
    op.drop_table("learning_paths")
    op.drop_table("recommendations")
    op.drop_table("learning_progress")
    op.drop_table("course_skills")
    op.drop_table("courses")
    op.drop_table("skill_gaps")
    op.drop_table("competency_evidence")
    op.drop_table("user_competencies")
    op.drop_table("role_competencies")
    op.drop_table("users")
    op.drop_table("skills")
    op.drop_table("competencies")
    op.drop_table("organizations")
    op.drop_table("departments")
    op.drop_table("competency_domains")
    op.execute("DROP EXTENSION IF EXISTS vector")
