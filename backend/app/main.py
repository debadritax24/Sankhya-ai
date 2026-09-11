from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import get_settings
from app.core.database import init_db, close_db, get_session_factory
from app.core.redis import init_redis, close_redis, get_redis_client
from app.core.logging_middleware import RequestContextMiddleware
from app.api.v1.router import v1_router
from sqlalchemy import text

settings = get_settings()

app = FastAPI(
    title="SANKHYA AI",
    version="1.0.0",
    description="AI-enabled Skill Intelligence and Learning Platform for India's Official Statistical System",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(RequestContextMiddleware)

app.include_router(v1_router)


@app.on_event("startup")
async def startup_event():
    await init_db()
    await init_redis()


@app.on_event("shutdown")
async def shutdown_event():
    await close_db()
    await close_redis()

@app.get("/")
async def root():
    return {"message": "SANKHYA AI Backend API", "docs": "/docs"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": "1.0.0"}

@app.get("/health/db")
async def readiness_check(response: Response):
    try:
        session_factory = get_session_factory()
        async with session_factory() as session:
            await session.execute(text("SELECT 1"))
        return {"status": "healthy", "database": "connected"}
    except Exception:
        response.status_code = 503
        return {"status": "unhealthy", "database": "disconnected"}
