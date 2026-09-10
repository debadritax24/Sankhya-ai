"""
SANKHYA AI — Migration Runner
Creates pgvector extension and all tables via Base.metadata.create_all.
Reads DATABASE_URL from .env.

Usage:
    cd backend
    python run_migration.py
"""

import asyncio
import os
import sys
import ssl

from dotenv import load_dotenv
from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine
import asyncpg

# Load .env from project root (one level up from backend/)
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))
# Also try local .env
load_dotenv()

# Ensure app package is importable
sys.path.insert(0, os.path.dirname(__file__))

from app.core.database import Base

# Import the model registry — this loads ALL models in dependency order
# so SQLAlchemy's mapper can resolve every relationship string reference.
from app.models import *  # noqa: F401, F403


def get_database_url() -> str:
    url = os.getenv("DATABASE_URL")
    if not url:
        raise RuntimeError(
            "DATABASE_URL not found in environment. "
            "Set it in the project root .env file."
        )
    # Ensure async driver
    if url.startswith("postgresql://"):
        url = url.replace("postgresql://", "postgresql+asyncpg://", 1)
    elif url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql+asyncpg://", 1)
    return url


def get_raw_url(database_url: str) -> str:
    """Convert async URL to raw DSN for asyncpg, stripping query params."""
    raw = database_url.replace("postgresql+asyncpg://", "postgresql://")
    if "?" in raw:
        raw = raw.split("?")[0]
    return raw


async def create_pgvector_extension(database_url: str) -> bool:
    """Create the pgvector extension using raw asyncpg connection."""
    print("[1/3] Creating pgvector extension...")
    raw_url = get_raw_url(database_url)
    ssl_context = ssl.create_default_context()
    try:
        conn = await asyncpg.connect(raw_url, ssl=ssl_context)
        await conn.execute("CREATE EXTENSION IF NOT EXISTS vector")
        await conn.close()
        print("      pgvector extension ready.")
        return True
    except Exception as e:
        print(f"      WARNING: Could not create pgvector extension: {e}")
        print("      Continuing without pgvector (vector columns will be skipped).")
        return False


async def create_all_tables(database_url: str) -> None:
    """Use SQLAlchemy to create all tables defined in Base.metadata."""
    print("[2/3] Creating tables via Base.metadata.create_all...")
    connect_args = {"ssl": "require"} if "neon.tech" in database_url else {}
    engine = create_async_engine(database_url, pool_pre_ping=True, connect_args=connect_args)

    # First, create pgvector extension through SQLAlchemy
    async with engine.begin() as conn:
        await conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector"))

    # Create all tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    await engine.dispose()
    print("      All tables created.")


async def verify_tables(database_url: str) -> list[str]:
    """Query information_schema to list all public tables."""
    print("[3/3] Verifying tables exist...")
    raw_url = get_raw_url(database_url)
    ssl_context = ssl.create_default_context()
    conn = await asyncpg.connect(raw_url, ssl=ssl_context)
    rows = await conn.fetch(
        "SELECT table_name FROM information_schema.tables "
        "WHERE table_schema = 'public' ORDER BY table_name"
    )
    table_names = [r["table_name"] for r in rows]
    await conn.close()

    expected = [
        "ai_conversations",
        "ai_messages",
        "assessment_answers",
        "assessment_attempts",
        "assessment_questions",
        "assessments",
        "audit_logs",
        "competencies",
        "competency_domains",
        "competency_evidence",
        "course_skills",
        "courses",
        "departments",
        "document_chunks",
        "documents",
        "embeddings",
        "learning_paths",
        "learning_progress",
        "notifications",
        "organizations",
        "recommendations",
        "role_competencies",
        "skill_gaps",
        "skills",
        "training_programmes",
        "user_competencies",
        "users",
    ]

    found = [t for t in expected if t in table_names]
    missing = [t for t in expected if t not in table_names]

    if missing:
        print(f"      Missing tables: {', '.join(missing)}")
    else:
        print(f"      All {len(expected)} tables verified.")

    return table_names


async def main() -> None:
    print("=" * 60)
    print("SANKHYA AI — Migration Runner")
    print("=" * 60)

    database_url = get_database_url()
    print(f"Target: {database_url.split('@')[-1] if '@' in database_url else database_url}\n")

    try:
        await create_pgvector_extension(database_url)
        await create_all_tables(database_url)
        tables = await verify_tables(database_url)

        print("\n" + "=" * 60)
        print(f"MIGRATION COMPLETE — {len(tables)} tables in database")
        print("=" * 60)
        for t in tables:
            print(f"  ✓ {t}")

    except Exception as e:
        print(f"\nMIGRATION FAILED: {e}")
        sys.exit(1)


if __name__ == "__main__":
    asyncio.run(main())
