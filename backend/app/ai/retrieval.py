from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.ai.embeddings import generate_embedding

async def semantic_search(db: AsyncSession, query: str, limit: int = 5) -> list[dict]:
    """
    Embeds the search query and performs a semantic search against the 
    pgvector embeddings table using Cosine Distance (<=>).
    """
    # 1. Embed the user's query using OpenAI
    query_vector = await generate_embedding(query)
    
    # Format the vector for pgvector (e.g., "[0.1, 0.2, ...]")
    vector_str = f"[{','.join(str(x) for x in query_vector)}]"
    
    # 2. Perform approximate nearest neighbor search using HNSW index
    # We select the chunk content, metadata, and the cosine distance
    sql = text("""
        SELECT 
            c.id AS chunk_id,
            c.content,
            c.metadata AS chunk_metadata,
            e.vector_1536 <=> :vector AS distance
        FROM embeddings e
        JOIN document_chunks c ON c.id = e.chunk_id
        ORDER BY e.vector_1536 <=> :vector ASC
        LIMIT :limit
    """)
    
    result = await db.execute(sql, {"vector": vector_str, "limit": limit})
    rows = result.fetchall()
    
    return [
        {
            "chunk_id": row.chunk_id,
            "content": row.content,
            "metadata": row.chunk_metadata,
            "distance": float(row.distance)
        }
        for row in rows
    ]
