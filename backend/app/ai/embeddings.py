from openai import AsyncOpenAI
from app.core.config import get_settings

settings = get_settings()

client = AsyncOpenAI(api_key=settings.LLM_API_KEY) if settings.LLM_API_KEY else None

async def generate_embedding(text: str) -> list[float]:
    """Generates a vector embedding for a given text using OpenAI."""
    if not client:
        raise RuntimeError("LLM_API_KEY is not configured")
    
    response = await client.embeddings.create(
        model=settings.EMBEDDING_MODEL,
        input=text,
        encoding_format="float"
    )
    return response.data[0].embedding

async def generate_embeddings_batch(texts: list[str]) -> list[list[float]]:
    """Generates vector embeddings for a list of texts in batch."""
    if not client:
        raise RuntimeError("LLM_API_KEY is not configured")
        
    response = await client.embeddings.create(
        model=settings.EMBEDDING_MODEL,
        input=texts,
        encoding_format="float"
    )
    return [item.embedding for item in response.data]
