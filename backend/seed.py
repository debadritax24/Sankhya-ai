"""
SANKHYA AI — Seed Data Script
Creates initial competency domains, competencies, skills, departments,
organizations, courses, and role competencies for the LEARNER role.

Usage:
    cd backend
    python seed.py
"""

import asyncio
import uuid
from datetime import datetime

from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from dotenv import load_dotenv
import os

load_dotenv()

from app.core.database import Base
from app.models import (  # noqa: F401 — triggers full mapper configuration
    CompetencyDomain,
    Competency,
    Skill,
    RoleCompetency,
    Department,
    Organization,
    Course,
    CourseSkill,
)

# ---------------------------------------------------------------------------
# Data Definitions
# ---------------------------------------------------------------------------

COMPETENCY_DOMAINS = [
    {
        "name": "Statistical Methods & Analytics",
        "code": "STATISTICAL",
        "description": "Core statistical methodologies, data analysis techniques, and quantitative reasoning skills essential for India's official statistical system.",
    },
    {
        "name": "Technical & Digital Skills",
        "code": "TECHNICAL",
        "description": "Programming, database management, and technology skills required for modern data processing and analysis.",
    },
    {
        "name": "Digital Governance & Data Systems",
        "code": "DIGITAL_GOVERNANCE",
        "description": "Knowledge of GIS, remote sensing, data infrastructure, and digital governance frameworks used in government data collection.",
    },
    {
        "name": "Behavioural & Managerial Competencies",
        "code": "BEHAVIOURAL_MANAGERIAL",
        "description": "Soft skills, leadership, communication, and project management capabilities for effective governance and teamwork.",
    },
]

COMPETENCIES = [
    # STATISTICAL domain
    {"name": "Python Programming", "domain_code": "STATISTICAL", "description": "Python for statistical computing, data manipulation with pandas/numpy, and reproducible analysis workflows."},
    {"name": "SQL & Database Management", "domain_code": "STATISTICAL", "description": "Relational database querying, data extraction, and SQL-based analytical operations."},
    {"name": "Survey Design & Methodology", "domain_code": "STATISTICAL", "description": "Designing sample surveys, questionnaire construction, sampling frames, and field survey operations."},
    {"name": "Data Visualization & Reporting", "domain_code": "STATISTICAL", "description": "Creating effective visualizations, dashboards, and statistical reports for policy communication."},
    {"name": "Statistical Theory & Applications", "domain_code": "STATISTICAL", "description": "Probability distributions, hypothesis testing, regression analysis, time series, and applied statistics."},
    {"name": "AI & Machine Learning", "domain_code": "STATISTICAL", "description": "Applied ML for classification, clustering, NLP, and predictive analytics in official statistics."},
    # TECHNICAL domain
    {"name": "R Programming", "domain_code": "TECHNICAL", "description": "R language for statistical graphics, data analysis, and reproducible research."},
    {"name": "Research Methods", "domain_code": "TECHNICAL", "description": "Research design, literature review, methodology selection, and academic writing for statistical research."},
    # DIGITAL_GOVERNANCE domain
    {"name": "GIS & Spatial Analysis", "domain_code": "DIGITAL_GOVERNANCE", "description": "Geographic Information Systems, spatial data handling, map-based analytics for census and survey data."},
    {"name": "NSSO Framework & Operations", "domain_code": "DIGITAL_GOVERNANCE", "description": "Understanding of NSSO organisational structure, survey schedules, and operational procedures."},
    # BEHAVIOURAL_MANAGERIAL domain
    {"name": "Communication & Presentation", "domain_code": "BEHAVIOURAL_MANAGERIAL", "description": "Effective written and verbal communication, report writing, and stakeholder presentation skills."},
    {"name": "Leadership & Team Management", "domain_code": "BEHAVIOURAL_MANAGERIAL", "description": "Team leadership, project coordination, conflict resolution, and organisational behaviour in government settings."},
]

SKILLS_BY_COMPETENCY = {
    "Python Programming": [
        ("Python for Data Analysis", "Using pandas, numpy, and matplotlib for exploratory data analysis"),
        ("Python Scripting", "Writing automation scripts and ETL pipelines in Python"),
        ("Jupyter Notebooks", "Creating reproducible analytical notebooks with code and visualizations"),
    ],
    "SQL & Database Management": [
        ("PostgreSQL", "Advanced querying, window functions, CTEs, and performance tuning"),
        ("Data Extraction", "Writing complex SELECT, JOIN, and aggregation queries for survey data"),
        ("Database Design", "Schema design, normalization, and indexing for analytical workloads"),
    ],
    "Survey Design & Methodology": [
        ("Questionnaire Design", "Crafting unbiased, culturally appropriate survey instruments"),
        ("Sampling Techniques", "Stratified, multistage, and cluster sampling for national surveys"),
        ("Field Operations", "Survey execution, enumerator training, and quality control"),
    ],
    "Data Visualization & Reporting": [
        ("Statistical Graphics", "Creating publication-quality charts using matplotlib, seaborn, ggplot2"),
        ("Dashboard Development", "Building interactive dashboards with Streamlit or similar tools"),
        ("Report Writing", "Structuring analytical reports for policy audiences"),
    ],
    "Statistical Theory & Applications": [
        ("Inferential Statistics", "Hypothesis testing, confidence intervals, p-values, effect sizes"),
        ("Regression Analysis", "Linear, logistic, and multilevel modelling for survey data"),
        ("Time Series Analysis", "Forecasting, decomposition, and trend analysis for economic indicators"),
    ],
    "AI & Machine Learning": [
        ("Supervised Learning", "Classification and regression models for official statistics"),
        ("Natural Language Processing", "Text analysis, sentiment detection, and document classification"),
        ("Model Evaluation", "Cross-validation, metrics selection, and bias detection in ML models"),
    ],
    "R Programming": [
        ("R for Statistics", "Statistical computing with R base and tidyverse packages"),
        ("R Graphics", "Creating statistical plots with ggplot2 and R Shiny"),
        ("Reproducible Research", "R Markdown and Quarto for reproducible analytical documents"),
    ],
    "Research Methods": [
        ("Literature Review", "Systematic review and meta-analysis methodologies"),
        ("Research Design", "Quantitative, qualitative, and mixed-methods research approaches"),
        ("Academic Writing", "Writing research papers, technical reports, and policy briefs"),
    ],
    "GIS & Spatial Analysis": [
        ("QGIS / ArcGIS", "Desktop GIS operations for spatial data management"),
        ("Spatial Data Processing", "Working with shapefiles, GeoJSON, and raster data"),
        ("Spatial Statistics", "Geospatial analysis, hotspot detection, and spatial autocorrelation"),
    ],
    "NSSO Framework & Operations": [
        ("NSSO Survey Schedules", "Understanding NSSO survey instruments and data collection protocols"),
        ("NSSO Data Access", "Navigating NSSO data portals and accessing released datasets"),
        ("NSSO Quality Standards", "Adhering to NSSO quality benchmarks and data validation procedures"),
    ],
    "Communication & Presentation": [
        ("Technical Writing", "Clear, concise writing for government reports and memoranda"),
        ("Data Storytelling", "Communicating statistical findings to non-technical stakeholders"),
        ("Presentation Skills", "Delivering effective presentations to senior officials and policymakers"),
    ],
    "Leadership & Team Management": [
        ("Project Management", "Planning, executing, and monitoring government projects"),
        ("Team Coordination", "Managing cross-functional teams in survey and data operations"),
        ("Stakeholder Engagement", "Liaising with ministries, departments, and external agencies"),
    ],
}

DEPARTMENTS = [
    {"name": "National Statistical Office", "code": "NSO", "description": "Core statistical operations and data collection wing of MoSPI."},
    {"name": "Data Analytics & Research", "code": "DATA_ANALYTICS", "description": "Advanced analytics, data science, and research initiatives."},
    {"name": "Survey Design Division", "code": "SURVEY_DESIGN", "description": "Designing and planning national sample surveys and censuses."},
    {"name": "IT Infrastructure", "code": "IT_INFRA", "description": "Managing digital infrastructure, databases, and technology systems."},
    {"name": "Training & Capacity Building", "code": "TRAINING", "description": "Training programmes for statistical officers and supporting staff."},
]

ORGANIZATIONS = [
    {"name": "Ministry of Statistics and Programme Implementation", "code": "MOSPI", "parent_id": None},
    {"name": "National Statistical Office — Delhi", "code": "NSO_DELHI", "parent_id": "MOSPI"},
    {"name": "National Statistical Office — Regional", "code": "NSO_REGIONAL", "parent_id": "MOSPI"},
]

COURSES = [
    {
        "title": "Python for Statistical Data Analysis",
        "description": "Comprehensive course on using Python for statistical computing, data manipulation with pandas, and visualization with matplotlib.",
        "provider": "iGOT Karmayogi",
        "source": "iGOT",
        "external_id": "igot-python-stats-001",
        "url": "https://igate.karmayogi.gov.in/course/python-stats",
        "duration_minutes": 1200,
        "difficulty": "Intermediate",
        "language": "en",
        "skills": ["Python for Data Analysis", "Python Scripting"],
    },
    {
        "title": "SQL Fundamentals for Government Data",
        "description": "Learn SQL for querying government databases, extracting survey data, and performing data analysis.",
        "provider": "Training Programme and Academic Centre",
        "source": "TPAC",
        "external_id": "tpac-sql-001",
        "url": "https://tpac.gov.in/course/sql-fundamentals",
        "duration_minutes": 900,
        "difficulty": "Beginner",
        "language": "en",
        "skills": ["PostgreSQL", "Data Extraction"],
    },
    {
        "title": "Survey Methodology and Field Operations",
        "description": "NSSO-approved training on survey design, sampling methods, and field survey execution.",
        "provider": "Internal Training Division",
        "source": "INTERNAL",
        "external_id": "int-survey-001",
        "url": None,
        "duration_minutes": 1800,
        "difficulty": "Advanced",
        "language": "en",
        "skills": ["Sampling Techniques", "Field Operations"],
    },
    {
        "title": "Data Visualization for Policy Communication",
        "description": "Creating impactful charts, dashboards, and visual reports for communicating statistical findings to policymakers.",
        "provider": "iGOT Karmayogi",
        "source": "iGOT",
        "external_id": "igot-dataviz-001",
        "url": "https://igate.karmayogi.gov.in/course/dataviz",
        "duration_minutes": 600,
        "difficulty": "Beginner",
        "language": "en",
        "skills": ["Statistical Graphics", "Dashboard Development"],
    },
    {
        "title": "Machine Learning for Official Statistics",
        "description": "Applied machine learning techniques for classification, clustering, and prediction in government data.",
        "provider": "Training Programme and Academic Centre",
        "source": "TPAC",
        "external_id": "tpac-ml-001",
        "url": "https://tpac.gov.in/course/ml-official-stats",
        "duration_minutes": 1500,
        "difficulty": "Advanced",
        "language": "en",
        "skills": ["Supervised Learning", "Model Evaluation"],
    },
    {
        "title": "R Programming for Survey Data Analysis",
        "description": "Statistical computing with R, focusing on analysis of NSSO survey data and reproducible research.",
        "provider": "Internal Training Division",
        "source": "INTERNAL",
        "external_id": "int-r-survey-001",
        "url": None,
        "duration_minutes": 1200,
        "difficulty": "Intermediate",
        "language": "en",
        "skills": ["R for Statistics", "Reproducible Research"],
    },
]

# Role competencies: which competencies a LEARNER role should have, and at what required level
LEARNER_ROLE_COMPETENCIES = [
    ("Python Programming", 2),
    ("SQL & Database Management", 2),
    ("Survey Design & Methodology", 3),
    ("Data Visualization & Reporting", 2),
    ("Statistical Theory & Applications", 3),
    ("Communication & Presentation", 2),
    ("Research Methods", 2),
    ("NSSO Framework & Operations", 2),
]


# ---------------------------------------------------------------------------
# Helper
# ---------------------------------------------------------------------------

async def _exists(session: AsyncSession, model, **filters) -> bool:
    """Return True if a row matching the filters already exists."""
    stmt = select(model).where(*(getattr(model, k) == v for k, v in filters.items()))
    result = await session.execute(stmt)
    return result.scalar_one_or_none() is not None


async def _get_or_create(session: AsyncSession, model, defaults: dict, **filters):
    """Return existing row or create a new one. Returns (instance, created)."""
    stmt = select(model).where(*(getattr(model, k) == v for k, v in filters.items()))
    result = await session.execute(stmt)
    existing = result.scalar_one_or_none()
    if existing:
        return existing, False
    obj = model(**filters, **defaults)
    session.add(obj)
    await session.flush()
    return obj, True


# ---------------------------------------------------------------------------
# Seed Functions
# ---------------------------------------------------------------------------

async def seed_domains(session: AsyncSession) -> dict[str, CompetencyDomain]:
    print("  Seeding competency domains...")
    domain_map: dict[str, CompetencyDomain] = {}
    for data in COMPETENCY_DOMAINS:
        obj, created = await _get_or_create(
            session,
            CompetencyDomain,
            defaults={"description": data["description"]},
            name=data["name"],
            code=data["code"],
        )
        domain_map[data["code"]] = obj
        status = "CREATED" if created else "EXISTS"
        print(f"    [{status}] {data['code']}")
    return domain_map


async def seed_competencies(session: AsyncSession, domain_map: dict) -> dict[str, Competency]:
    print("  Seeding competencies...")
    competency_map: dict[str, Competency] = {}
    for data in COMPETENCIES:
        domain = domain_map[data["domain_code"]]
        obj, created = await _get_or_create(
            session,
            Competency,
            defaults={"description": data["description"], "domain_id": domain.id},
            name=data["name"],
        )
        competency_map[data["name"]] = obj
        status = "CREATED" if created else "EXISTS"
        print(f"    [{status}] {data['name']}")
    return competency_map


async def seed_skills(session: AsyncSession, competency_map: dict) -> dict[str, Skill]:
    print("  Seeding skills...")
    skill_map: dict[str, Skill] = {}
    for comp_name, skills in SKILLS_BY_COMPETENCY.items():
        competency = competency_map[comp_name]
        for skill_name, description in skills:
            obj, created = await _get_or_create(
                session,
                Skill,
                defaults={"description": description, "competency_id": competency.id},
                name=skill_name,
            )
            skill_map[skill_name] = obj
            status = "CREATED" if created else "EXISTS"
            print(f"    [{status}] {skill_name} ({comp_name})")
    return skill_map


async def seed_departments(session: AsyncSession) -> dict[str, Department]:
    print("  Seeding departments...")
    dept_map: dict[str, Department] = {}
    for data in DEPARTMENTS:
        obj, created = await _get_or_create(
            session,
            Department,
            defaults={"description": data["description"]},
            name=data["name"],
            code=data["code"],
        )
        dept_map[data["code"]] = obj
        status = "CREATED" if created else "EXISTS"
        print(f"    [{status}] {data['code']}")
    return dept_map


async def seed_organizations(session: AsyncSession) -> dict[str, Organization]:
    print("  Seeding organizations...")
    org_map: dict[str, Organization] = {}
    # First pass: create parent org
    for data in ORGANIZATIONS:
        if data["parent_id"] is None:
            obj, created = await _get_or_create(
                session,
                Organization,
                defaults={"parent_id": None},
                name=data["name"],
                code=data["code"],
            )
            org_map[data["code"]] = obj
            status = "CREATED" if created else "EXISTS"
            print(f"    [{status}] {data['code']}")
    # Second pass: create child orgs
    for data in ORGANIZATIONS:
        if data["parent_id"] is not None:
            obj, created = await _get_or_create(
                session,
                Organization,
                defaults={"parent_id": data["parent_id"]},
                name=data["name"],
                code=data["code"],
            )
            org_map[data["code"]] = obj
            status = "CREATED" if created else "EXISTS"
            print(f"    [{status}] {data['code']}")
    return org_map


async def seed_courses(session: AsyncSession, skill_map: dict[str, Skill]) -> None:
    print("  Seeding courses...")
    for data in COURSES:
        course_obj, created = await _get_or_create(
            session,
            Course,
            defaults={
                "description": data["description"],
                "provider": data["provider"],
                "source": data["source"],
                "external_id": data["external_id"],
                "url": data["url"],
                "duration_minutes": data["duration_minutes"],
                "difficulty": data["difficulty"],
                "language": data["language"],
            },
            title=data["title"],
        )
        status = "CREATED" if created else "EXISTS"
        print(f"    [{status}] {data['title']}")
        # Link course to skills
        for skill_name in data.get("skills", []):
            skill = skill_map.get(skill_name)
            if skill:
                link_stmt = select(CourseSkill).where(
                    CourseSkill.course_id == course_obj.id,
                    CourseSkill.skill_id == skill.id,
                )
                link_result = await session.execute(link_stmt)
                if link_result.scalar_one_or_none() is None:
                    session.add(
                        CourseSkill(
                            course_id=course_obj.id,
                            skill_id=skill.id,
                            relevance_score=1.0,
                        )
                    )
                    print(f"      Linked: {data['title']} -> {skill_name}")


async def seed_role_competencies(session: AsyncSession, competency_map: dict) -> None:
    print("  Seeding role competencies for LEARNER role...")
    for comp_name, required_level in LEARNER_ROLE_COMPETENCIES:
        competency = competency_map.get(comp_name)
        if not competency:
            print(f"    [SKIP] Competency not found: {comp_name}")
            continue
        obj, created = await _get_or_create(
            session,
            RoleCompetency,
            defaults={"required_level": required_level},
            role_id="LEARNER",
            competency_id=competency.id,
        )
        status = "CREATED" if created else "EXISTS"
        print(f"    [{status}] LEARNER -> {comp_name} (level {required_level})")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

async def main():
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        raise RuntimeError("DATABASE_URL not set in environment")

    # Ensure async driver prefix
    if database_url.startswith("postgresql://"):
        database_url = database_url.replace("postgresql://", "postgresql+asyncpg://", 1)
    elif database_url.startswith("postgres://"):
        database_url = database_url.replace("postgres://", "postgresql+asyncpg://", 1)

    print("=" * 60)
    print("SANKHYA AI — Seed Data Script")
    print("=" * 60)
    print(f"Connecting to database...")

    engine = create_async_engine(database_url, pool_pre_ping=True)
    session_factory = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

    async with session_factory() as session:
        try:
            print("\n[1/7] Competency Domains")
            domain_map = await seed_domains(session)

            print("\n[2/7] Competencies")
            competency_map = await seed_competencies(session, domain_map)

            print("\n[3/7] Skills")
            skill_map = await seed_skills(session, competency_map)

            print("\n[4/7] Departments")
            await seed_departments(session)

            print("\n[5/7] Organizations")
            await seed_organizations(session)

            print("\n[6/7] Courses & Course-Skill Links")
            await seed_courses(session, skill_map)

            print("\n[7/7] Role Competencies (LEARNER)")
            await seed_role_competencies(session, competency_map)

            await session.commit()
            print("\n" + "=" * 60)
            print("Seed completed successfully!")
            print("=" * 60)

        except Exception as e:
            await session.rollback()
            print(f"\nERROR: {e}")
            raise
        finally:
            await engine.dispose()


if __name__ == "__main__":
    asyncio.run(main())
