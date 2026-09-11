import re

def clean_text(text: str) -> str:
    """Removes excessive whitespace and standardizes formatting."""
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def chunk_text(text: str, chunk_size: int = 1000, overlap: int = 100) -> list[str]:
    """Splits text into overlapping chunks for semantic retrieval."""
    text = clean_text(text)
    words = text.split()
    
    chunks = []
    i = 0
    while i < len(words):
        chunk_words = words[i:i + chunk_size]
        chunks.append(" ".join(chunk_words))
        i += chunk_size - overlap
        
    return chunks
