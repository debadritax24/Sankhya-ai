from datetime import datetime
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models import (
    Competency,
    CompetencyDomain,
    Skill,
    UserCompetency,
    RoleCompetency,
)


class CompetencyService:
    """Service for competency domains, skills, and user competency tracking."""

    @staticmethod
    async def get_domains(db: AsyncSession) -> list[CompetencyDomain]:
        """Return all competency domains."""
        result = await db.execute(select(CompetencyDomain).order_by(CompetencyDomain.name))
        return list(result.scalars().all())

    @staticmethod
    async def get_competencies(db: AsyncSession) -> list[Competency]:
        """Return all competencies with their domain loaded."""
        result = await db.execute(
            select(Competency).options(selectinload(Competency.domain)).order_by(Competency.name)
        )
        return list(result.scalars().all())

    @staticmethod
    async def get_competency_skills(db: AsyncSession, competency_id: str) -> list[Skill]:
        """Return all skills belonging to a competency."""
        result = await db.execute(
            select(Skill).where(Skill.competency_id == competency_id).order_by(Skill.name)
        )
        return list(result.scalars().all())

    @staticmethod
    async def get_user_competencies(db: AsyncSession, user_id: str) -> list[UserCompetency]:
        """Return user competency records with competency and domain loaded."""
        result = await db.execute(
            select(UserCompetency)
            .options(
                selectinload(UserCompetency.competency).selectinload(Competency.domain),
            )
            .where(UserCompetency.user_id == user_id)
        )
        return list(result.scalars().all())

    @staticmethod
    async def update_user_competency(
        db: AsyncSession,
        user_id: str,
        competency_id: str,
        data: dict,
    ) -> UserCompetency:
        """Update or create a UserCompetency record for a user-competency pair."""
        result = await db.execute(
            select(UserCompetency).where(
                UserCompetency.user_id == user_id,
                UserCompetency.competency_id == competency_id,
            )
        )
        uc = result.scalar_one_or_none()
        if uc is None:
            uc = UserCompetency(user_id=user_id, competency_id=competency_id, **data)
            db.add(uc)
        else:
            for field, value in data.items():
                if hasattr(uc, field) and value is not None:
                    setattr(uc, field, value)
            uc.updated_at = datetime.utcnow()
        await db.flush()
        await db.refresh(uc)
        return uc

    @staticmethod
    async def calculate_competency_summary(db: AsyncSession, user_id: str) -> dict:
        """Calculate aggregate competency statistics for a user.

        Returns a dict with:
            - total_competencies: int
            - average_level: float
            - domain_breakdown: list[dict] with domain name, avg_level, count
            - strongest: list[dict] top 3 competencies by current_level
            - weakest: list[dict] bottom 3 competencies by current_level
        """
        user_competencies = await CompetencyService.get_user_competencies(db, user_id)
        if not user_competencies:
            return {
                "total_competencies": 0,
                "average_level": 0.0,
                "domain_breakdown": [],
                "strongest": [],
                "weakest": [],
            }

        levels = [uc.current_level for uc in user_competencies]
        avg_level = sum(levels) / len(levels) if levels else 0.0

        domain_map: dict[str, dict] = {}
        for uc in user_competencies:
            domain_name = uc.competency.domain.name if uc.competency and uc.competency.domain else "Uncategorized"
            if domain_name not in domain_map:
                domain_map[domain_name] = {"name": domain_name, "levels": []}
            domain_map[domain_name]["levels"].append(uc.current_level)

        domain_breakdown = []
        for entry in domain_map.values():
            lvl = entry["levels"]
            domain_breakdown.append({
                "name": entry["name"],
                "average_level": sum(lvl) / len(lvl),
                "count": len(lvl),
            })

        sorted_uc = sorted(user_competencies, key=lambda x: x.current_level, reverse=True)
        strongest = [
            {"competency": uc.competency.name, "level": uc.current_level}
            for uc in sorted_uc[:3]
        ]
        weakest = [
            {"competency": uc.competency.name, "level": uc.current_level}
            for uc in sorted_uc[-3:]
        ]

        return {
            "total_competencies": len(user_competencies),
            "average_level": round(avg_level, 2),
            "domain_breakdown": domain_breakdown,
            "strongest": strongest,
            "weakest": weakest,
        }
