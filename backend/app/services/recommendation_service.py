import json
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.ai.recommendation_engine import generate_recommendation_explanation
import asyncio
from app.models import Skill, UserCompetency, Course, CourseSkill, Recommendation, SkillGap
from app.core.redis import cache_delete_pattern, cache_get, cache_set


CACHE_PREFIX = "recommendations"


class RecommendationService:
    """Service for generating and caching course recommendations.

    Uses a deterministic ranking algorithm based on skill gap severity,
    course relevance scores, and recency of user activity.
    """

    @staticmethod
    async def get_recommendations(db: AsyncSession, user_id: str) -> list[dict]:
        """Return cached or freshly generated recommendations."""
        cache_key = f"{CACHE_PREFIX}:{user_id}"
        cached = await cache_get(cache_key)
        if cached is not None:
            return json.loads(cached)
        recs = await RecommendationService.generate_recommendations(db, user_id)
        if recs:
            await cache_set(cache_key, json.dumps(recs), ttl=600)
        return recs

    @staticmethod
    async def generate_recommendations(db: AsyncSession, user_id: str) -> list[dict]:
        """Generate ranked course recommendations using a deterministic scoring formula.

        Ranking factors (weighted):
          - gap_severity: 0.4 * (gap_score / max_possible_gap)
          - relevance:     0.3 * course_skill.relevance_score
          - breadth:       0.2 * number of user gaps the course addresses
          - level_match:   0.1 * alignment between course difficulty and gap need
        """
        gap_result = await db.execute(
            select(SkillGap)
            .options(selectinload(SkillGap.skill))
            .where(SkillGap.user_id == user_id, SkillGap.priority.in_(["HIGH", "MEDIUM", "LOW"]))
        )
        skill_gaps = gap_result.scalars().all()
        if not skill_gaps:
            return []

        gap_by_skill: dict[str, SkillGap] = {sg.skill_id: sg for sg in skill_gaps}
        skill_ids = list(gap_by_skill.keys())
        max_gap_score = max((sg.gap_score for sg in skill_gaps), default=1.0) or 1.0

        cs_result = await db.execute(
            select(CourseSkill)
            .options(selectinload(CourseSkill.skill), selectinload(CourseSkill.course))
            .where(CourseSkill.skill_id.in_(skill_ids))
        )
        course_skills = cs_result.scalars().all()

        course_scores: dict[str, dict] = {}
        for cs in course_skills:
            if cs.course.status != "ACTIVE":
                continue
            cid = cs.course.id
            if cid not in course_scores:
                course_scores[cid] = {
                    "course_id": cid,
                    "title": cs.course.title,
                    "provider": cs.course.provider,
                    "url": cs.course.url,
                    "addressed_gaps": [],
                    "raw_score": 0.0,
                }
            gap = gap_by_skill.get(cs.skill_id)
            if gap is None:
                continue
            gap_factor = 0.4 * (gap.gap_score / max_gap_score)
            relevance_factor = 0.3 * cs.relevance_score
            difficulty_map = {"Beginner": 1, "Intermediate": 2, "Advanced": 3}
            course_diff = difficulty_map.get(cs.course.difficulty or "", 2)
            level_need = 1 if gap.gap_score <= 1 else 2 if gap.gap_score <= 2 else 3
            level_factor = 0.1 * (1.0 - abs(course_diff - level_need) / 2.0)
            skill_score = gap_factor + relevance_factor + level_factor
            course_scores[cid]["raw_score"] += skill_score
            course_scores[cid]["addressed_gaps"].append(gap.skill_id)

        for entry in course_scores.values():
            breadth = len(entry["addressed_gaps"])
            entry["raw_score"] += 0.2 * min(breadth / 3.0, 1.0)

        ranked = sorted(course_scores.values(), key=lambda x: x["raw_score"], reverse=True)
        recommendations = []
        for rank, entry in enumerate(ranked[:20], start=1):
            recommendations.append({
                "course_id": entry["course_id"],
                "title": entry["title"],
                "provider": entry["provider"],
                "url": entry["url"],
                "rank": rank,
                "score": round(entry["raw_score"], 4),
                "addressed_gaps": entry["addressed_gaps"],
            })

        existing_result = await db.execute(
            select(Recommendation).where(Recommendation.user_id == user_id)
        )
        for rec in existing_result.scalars().all():
            await db.delete(rec)
            
        # Generate explanations in parallel
        async def fetch_reason(rec):
            gaps_info = [{"skill_name": gap_by_skill[g].skill.name, "current_level": 1, "target_level": gap_by_skill[g].target_level if hasattr(gap_by_skill[g], 'target_level') else 3} for g in rec["addressed_gaps"] if g in gap_by_skill]
            try:
                return await generate_recommendation_explanation("Government Official", rec["title"], gaps_info)
            except Exception:
                return f"Addresses {len(rec['addressed_gaps'])} skill gap(s)"

        reasons = await asyncio.gather(*(fetch_reason(rec) for rec in recommendations))

        for rec, reason_text in zip(recommendations, reasons):
            db.add(Recommendation(
                user_id=user_id,
                course_id=rec["course_id"],
                rank=rec["rank"],
                score=rec["score"],
                reason=reason_text,
            ))
        await db.flush()
        return recommendations

    @staticmethod
    async def invalidate_cache(user_id: str) -> None:
        """Remove all cached recommendations for a user."""
        await cache_delete_pattern(f"{CACHE_PREFIX}:{user_id}*")
