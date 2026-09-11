with open('backend/app/services/recommendation_service.py', 'r') as f:
    content = f.read()

import_str = "from app.ai.recommendation_engine import generate_recommendation_explanation\nimport asyncio"
content = content.replace("from app.models import", f"{import_str}\nfrom app.models import")

replacement = """
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
"""

import re
# Regex to find the block to replace
pattern = r"existing_result = await db.execute.*await db.flush\(\)"
content = re.sub(pattern, replacement.strip(), content, flags=re.DOTALL)

with open('backend/app/services/recommendation_service.py', 'w') as f:
    f.write(content)
