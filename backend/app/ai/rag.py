from sqlalchemy.ext.asyncio import AsyncSession
from app.ai.retrieval import semantic_search
from app.core.config import get_settings
from openai import AsyncOpenAI

settings = get_settings()
client = AsyncOpenAI(api_key=settings.LLM_API_KEY) if settings.LLM_API_KEY else None

async def ask_question_with_rag(db: AsyncSession, question: str) -> str:
    """Answers a user question grounded strictly in retrieved context."""
    if not client:
        raise RuntimeError("LLM_API_KEY is not configured")
        
    # 1. Retrieve most relevant document chunks
    chunks = await semantic_search(db, question, limit=3)
    
    if not chunks:
        return "I could not find any relevant information in the training materials."
        
    # 2. Construct context from chunks
    context_text = "\n\n---\n\n".join([
        f"Source Chunk ID: {chunk['chunk_id']}\nContent: {chunk['content']}"
        for chunk in chunks
    ])
    
    # 3. Generate answer using OpenAI
    system_prompt = (
        "You are an AI teaching assistant for the SANKHYA AI platform. "
        "Answer the user's question using ONLY the provided context. "
        "If the answer is not in the context, say 'I don't have enough information to answer that.' "
        "Always cite your sources using the Source Chunk ID."
    )
    
    response = await client.chat.completions.create(
        model=settings.LLM_MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Context:\n{context_text}\n\nQuestion: {question}"}
        ],
        temperature=0.0
    )
    
    return response.choices[0].message.content
