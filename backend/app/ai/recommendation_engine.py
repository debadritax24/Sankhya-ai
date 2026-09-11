from openai import AsyncOpenAI
from app.core.config import get_settings
from app.models import SkillGap, Course

settings = get_settings()
client = AsyncOpenAI(api_key=settings.LLM_API_KEY) if settings.LLM_API_KEY else None

async def generate_recommendation_explanation(
    user_role: str,
    course_title: str,
    addressed_gaps: list[dict]
) -> str:
    """Generates a contextual, explainable reason for recommending a course."""
    if not client:
        # Fallback if AI is not configured
        skills = ", ".join([g['skill_name'] for g in addressed_gaps])
        return f"Recommended to help you improve your skills in: {skills}."
        
    gaps_context = "\n".join([
        f"- {g['skill_name']}: Current Level {g['current_level']} -> Target Level {g['target_level']}"
        for g in addressed_gaps
    ])
    
    prompt = (
        f"You are the SANKHYA AI Recommendation Engine.\n"
        f"Role: {user_role}\n"
        f"Course to recommend: {course_title}\n"
        f"Skill Gaps Addressed:\n{gaps_context}\n\n"
        "Write a single, concise sentence explaining exactly why this course is recommended for this user based on their role and skill gaps. "
        "Example format: 'Recommended because SQL is currently Level 2 while the target competency for this role is Level 4.'"
    )
    
    response = await client.chat.completions.create(
        model=settings.LLM_MODEL,
        messages=[
            {"role": "system", "content": "You are a concise recommendation explanation generator."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.3,
        max_tokens=100
    )
    
    return response.choices[0].message.content.strip()
