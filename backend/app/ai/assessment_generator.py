import json
from openai import AsyncOpenAI
from app.core.config import get_settings

settings = get_settings()
client = AsyncOpenAI(api_key=settings.LLM_API_KEY) if settings.LLM_API_KEY else None

async def generate_mcqs_from_text(context_text: str, num_questions: int = 5) -> list[dict]:
    """Generates Multiple Choice Questions grounded in the provided text context."""
    if not client:
        raise RuntimeError("LLM_API_KEY is not configured")
        
    prompt = (
        f"Generate {num_questions} multiple-choice questions strictly based on the following text.\n\n"
        f"Context:\n{context_text}\n\n"
        "Output the result as a raw JSON array of objects. Do not include markdown formatting like ```json.\n"
        "Each object must have the following schema:\n"
        "{\n"
        '  "question": "The question text",\n'
        '  "options": ["Option A", "Option B", "Option C", "Option D"],\n'
        '  "correct_answer": "Option B",\n'
        '  "explanation": "Explanation of why this is correct based on the text."\n'
        "}"
    )
    
    response = await client.chat.completions.create(
        model=settings.LLM_MODEL,
        messages=[
            {"role": "system", "content": "You are an expert assessment generator. Generate strict JSON arrays only."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.2
    )
    
    raw_content = response.choices[0].message.content.strip()
    if raw_content.startswith("```json"):
        raw_content = raw_content[7:-3].strip()
        
    return json.loads(raw_content)
