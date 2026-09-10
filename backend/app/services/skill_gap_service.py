from datetime import datetime
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models import Competency, RoleCompetency, Skill, UserCompetency, SkillGap


class SkillGapService:
    """Service for querying and calculating skill gaps."""

    @staticmethod
    async def get_user_skill_gaps(db: AsyncSession, user_id: str) -> list[SkillGap]:
        """Return all skill gaps for a user with skill and competency loaded."""
        result = await db.execute(
            select(SkillGap)
            .options(
                selectinload(SkillGap.skill).selectinload(Skill.competency),
            )
            .where(SkillGap.user_id == user_id)
            .order_by(SkillGap.gap_score.desc())
        )
        return list(result.scalars().all())

    @staticmethod
    async def calculate_skill_gaps(db: AsyncSession, user_id: str) -> list[SkillGap]:
        """Recalculate skill gaps for a user by comparing user competencies against role requirements.

        Clears existing gaps, computes new ones, and returns the fresh list.
        """
        result = await db.execute(select(SkillGap).where(SkillGap.user_id == user_id))
        existing = result.scalars().all()
        for gap in existing:
            await db.delete(gap)
        await db.flush()

        user_result = await db.execute(
            select(UserCompetency).where(UserCompetency.user_id == user_id)
        )
        user_competencies = {
            uc.competency_id: uc for uc in user_result.scalars().all()
        }

        role_result = await db.execute(select(RoleCompetency))
        role_competencies = role_result.scalars().all()

        role_skill_map: dict[str, int] = {}
        for rc in role_competencies:
            comp_result = await db.execute(
                select(Skill.id).where(Skill.competency_id == rc.competency_id)
            )
            skill_ids = comp_result.scalars().all()
            for sid in skill_ids:
                role_skill_map[sid] = rc.required_level

        skill_result = await db.execute(select(Skill))
        all_skills = {s.id: s for s in skill_result.scalars().all()}

        gaps: list[SkillGap] = []
        for skill_id, required_level in role_skill_map.items():
            skill = all_skills.get(skill_id)
            if skill is None:
                continue
            uc = user_competencies.get(skill.competency_id)
            current_level = uc.current_level if uc else 0
            gap_score = max(0.0, float(required_level - current_level))
            if gap_score <= 0:
                continue
            priority = "HIGH" if gap_score >= 3 else "MEDIUM" if gap_score >= 2 else "LOW"
            gap = SkillGap(
                user_id=user_id,
                skill_id=skill_id,
                current_level=current_level,
                required_level=required_level,
                gap_score=gap_score,
                priority=priority,
            )
            db.add(gap)
            gaps.append(gap)

        await db.flush()
        for gap in gaps:
            await db.refresh(gap)
        return gaps

    @staticmethod
    async def get_by_skill(db: AsyncSession, user_id: str, skill_id: str) -> SkillGap | None:
        """Return the skill gap for a specific user-skill pair."""
        result = await db.execute(
            select(SkillGap).where(
                SkillGap.user_id == user_id,
                SkillGap.skill_id == skill_id,
            )
        )
        return result.scalar_one_or_none()
