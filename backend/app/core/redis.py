import redis.asyncio as redis
from app.core.config import get_settings
from app.core.logging import logger

settings = get_settings()

_redis_client = None


def get_redis_client() -> redis.Redis:
    global _redis_client
    if _redis_client is None:
        _redis_client = redis.from_url(
            settings.REDIS_URL,
            decode_responses=True,
        )
    return _redis_client


async def get_redis() -> redis.Redis:
    return get_redis_client()


async def init_redis() -> None:
    try:
        client = get_redis_client()
        await client.ping()
        logger.info("redis_connected")
    except Exception as e:
        logger.warning("redis_unavailable", error=str(e))


async def close_redis() -> None:
    global _redis_client
    if _redis_client:
        await _redis_client.close()
        _redis_client = None


async def cache_get(key: str) -> str | None:
    try:
        client = get_redis_client()
        return await client.get(key)
    except Exception:
        return None


async def cache_set(key: str, value: str, ttl: int = 300) -> None:
    try:
        client = get_redis_client()
        await client.set(key, value, ex=ttl)
    except Exception:
        pass


async def cache_delete(key: str) -> None:
    try:
        client = get_redis_client()
        await client.delete(key)
    except Exception:
        pass


async def cache_delete_pattern(pattern: str) -> None:
    try:
        client = get_redis_client()
        keys = []
        async for key in client.scan_iter(match=pattern):
            keys.append(key)
        if keys:
            await client.delete(*keys)
    except Exception:
        pass
