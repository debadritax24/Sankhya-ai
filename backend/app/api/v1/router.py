from fastapi import APIRouter
from app.api.v1 import (
    users,
    competencies,
    skill_gaps,
    courses,
    learning,
    assessments,
    recommendations,
    documents,
    ai_tutor,
    analytics,
    notifications,
    webhooks,
)

v1_router = APIRouter(prefix="/api/v1", tags=["v1"])

v1_router.include_router(users.router, prefix="/users", tags=["Users"])
v1_router.include_router(competencies.router, prefix="/competencies", tags=["Competencies"])
v1_router.include_router(skill_gaps.router, prefix="/skill-gaps", tags=["Skill Gaps"])
v1_router.include_router(courses.router, prefix="/courses", tags=["Courses"])
v1_router.include_router(learning.router, prefix="/learning", tags=["Learning"])
v1_router.include_router(assessments.router, prefix="/assessments", tags=["Assessments"])
v1_router.include_router(recommendations.router, prefix="/recommendations", tags=["Recommendations"])
v1_router.include_router(documents.router, prefix="/documents", tags=["Documents"])
v1_router.include_router(ai_tutor.router, prefix="/ai-tutor", tags=["AI Tutor"])
v1_router.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])
v1_router.include_router(notifications.router, prefix="/notifications", tags=["Notifications"])
v1_router.include_router(webhooks.router, prefix="/webhooks", tags=["Webhooks"])
