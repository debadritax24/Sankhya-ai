# SANKHYA AI

**AI-enabled Skill Intelligence and Learning Platform for India's Official Statistical System**

> SIH 2026 · Problem Statement 26101

---

## Overview

SANKHYA AI is a full-stack platform that helps Indian government officials identify competency gaps and access personalized learning recommendations. It connects individual skill growth with organizational capability requirements through an AI-driven closed loop:

```
Profile → Competency Assessment → Skill Gap Analysis → Personalized Recommendation
    → Learning (iGOT/TPAC) → Assessment → Performance Analysis → Competency Update
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS v4 |
| Backend | FastAPI, Python 3.14, SQLAlchemy 2.x (async) |
| Database | Neon PostgreSQL + pgvector |
| Cache | Redis |
| Auth | Clerk |
| Charts | Recharts |
| Animations | Framer Motion |
| Icons | lucide-react |

---

## Project Structure

```
sankhya-ai/
├── src/                          # Frontend (Next.js)
│   ├── app/                      # App Router pages
│   │   ├── (public)/             # Landing, About, How It Works
│   │   ├── (auth)/               # Sign-in, Sign-up (Clerk)
│   │   ├── dashboard/            # Learner dashboard
│   │   ├── competency/           # Skill DNA, competency profile
│   │   ├── learning/             # Learning paths, courses
│   │   ├── assessments/          # Assessments, quizzes
│   │   ├── ai-tutor/             # AI Learning Copilot
│   │   ├── admin/                # Admin dashboard, analytics
│   │   └── trainer/              # Content management, assessment creation
│   ├── components/               # UI primitives, layout, domain components
│   ├── lib/                      # Utilities, mock data, constants
│   ├── hooks/                    # Custom React hooks
│   └── types/                    # TypeScript type definitions
│
├── backend/                      # Backend (FastAPI)
│   ├── app/
│   │   ├── main.py               # FastAPI application
│   │   ├── core/                 # Config, database, Redis, auth, logging
│   │   ├── models/               # SQLAlchemy ORM models (27 tables)
│   │   ├── schemas/              # Pydantic request/response models
│   │   ├── api/v1/               # REST API routes (30 endpoints)
│   │   ├── services/             # Business logic layer
│   │   ├── ai/                   # AI/RAG components
│   │   └── integrations/         # iGOT, TPAC adapters
│   ├── migrations/               # Alembic migrations
│   ├── tests/                    # Pytest tests
│   ├── seed.py                   # Development seed data
│   └── run_migration.py          # Database migration runner
│
├── docs/                         # Architecture documentation
├── .env                          # Environment variables
└── AGENTS.md                     # Engineering rules
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.12+
- Neon PostgreSQL account
- Redis (local or remote)
- Clerk account

### 1. Clone and install

```bash
git clone <repo-url> && cd sankhya-ai

# Frontend
npm install

# Backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 2. Configure environment

Add to `.env`:

```env
# Frontend (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_API_URL=http://localhost:8000

# Backend
DATABASE_URL=postgresql+asyncpg://user:pass@your-neon-host/neondb
REDIS_URL=redis://localhost:6379/0
```

### 3. Set up database

```bash
cd backend
source venv/bin/activate
python run_migration.py    # Creates 27 tables + pgvector
python seed.py             # Populates competency framework, courses
```

### 4. Run development servers

```bash
# Terminal 1 — Frontend (port 3000)
npm run dev

# Terminal 2 — Backend (port 8000)
cd backend && source venv/bin/activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

API documentation available at `http://localhost:8000/docs`.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/health/ready` | Readiness (Postgres + Redis) |
| **Users** | | |
| GET | `/api/v1/users/me` | Current user profile |
| GET | `/api/v1/users/{id}` | User by ID |
| **Competencies** | | |
| GET | `/api/v1/competencies` | All competency domains |
| GET | `/api/v1/competencies/{id}` | Competency details |
| GET | `/api/v1/competencies/{id}/skills` | Skills for competency |
| GET | `/api/v1/competencies/me/competencies` | User's competency levels |
| PUT | `/api/v1/competencies/me/competencies/{id}` | Update competency level |
| **Skill Gaps** | | |
| GET | `/api/v1/skill-gaps` | User's skill gaps |
| GET | `/api/v1/skill-gaps/{skill_id}` | Specific skill gap |
| **Courses** | | |
| GET | `/api/v1/courses` | Course catalog |
| GET | `/api/v1/courses/{id}` | Course details |
| **Learning** | | |
| GET | `/api/v1/learning/progress` | Learning progress |
| PUT | `/api/v1/learning/progress/{course_id}` | Update progress |
| **Assessments** | | |
| GET | `/api/v1/assessments` | List assessments |
| GET | `/api/v1/assessments/{id}` | Assessment details |
| POST | `/api/v1/assessments/{id}/attempt` | Start attempt |
| POST | `/api/v1/assessments/{id}/submit` | Submit answers |
| GET | `/api/v1/assessments/results/{attempt_id}` | View results |
| **Recommendations** | | |
| GET | `/api/v1/recommendations` | Personalized recommendations |
| **Documents** | | |
| POST | `/api/v1/documents/upload` | Upload learning material |
| GET | `/api/v1/documents/{id}` | Document status |
| **AI Tutor** | | |
| POST | `/api/v1/ai-tutor/conversations` | Create conversation |
| POST | `/api/v1/ai-tutor/conversations/{id}/messages` | Send message |
| GET | `/api/v1/ai-tutor/conversations/{id}` | Get conversation |
| **Analytics** | | |
| GET | `/api/v1/analytics/learner` | Learner analytics |
| GET | `/api/v1/analytics/admin` | Admin analytics |
| **Notifications** | | |
| GET | `/api/v1/notifications` | List notifications |
| PUT | `/api/v1/notifications/{id}/read` | Mark as read |

---

## Database

27 tables on Neon PostgreSQL with pgvector:

| Category | Tables |
|----------|--------|
| Users & Orgs | `users`, `departments`, `organizations` |
| Competencies | `competency_domains`, `competencies`, `skills`, `role_competencies`, `user_competencies`, `competency_evidence` |
| Skill Gaps | `skill_gaps` |
| Learning | `courses`, `course_skills`, `learning_progress`, `recommendations`, `learning_paths` |
| Assessments | `assessments`, `assessment_questions`, `assessment_attempts`, `assessment_answers` |
| AI & Docs | `ai_conversations`, `ai_messages`, `documents`, `document_chunks`, `embeddings` |
| System | `notifications`, `audit_logs`, `training_programmes` |

---

## Key Features

**Skill DNA Visualization** — Radar chart showing competency levels across 4 domains (Statistical, Technical, Digital Governance, Behavioural/Managerial)

**Skill Gap Engine** — Deterministic ranking combining gap severity (0.4), role relevance (0.3), breadth (0.2), and level match (0.1)

**AI Assessment Generator** — Upload documents → extract text → chunk → embed → generate MCQs with confidence scoring and human review

**Personalized Recommendations** — Filter → semantic search → deterministic ranking → LLM explanation (LLM explains, does not decide)

**Role-Based Access** — Learner, Trainer, Admin, Super Admin with separate navigation and permissions

---

## Architecture Decisions

| Decision | Rationale |
|----------|-----------|
| Custom UI components | Full control over government aesthetic |
| Recharts | React-native SVG charts, RadarChart for Skill DNA |
| Lenis | Lightweight smooth scroll, respects `prefers-reduced-motion` |
| Server Components | Reduced client JS, faster initial loads |
| Async SQLAlchemy | Non-blocking database access for FastAPI |
| pgvector | Vector search without adding another database |
| Deterministic ranking | Recommendations are reproducible, not random LLM output |
| Service-oriented backend | Modular monolith, easy to extract services later |

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes | Clerk public key |
| `CLERK_SECRET_KEY` | Yes | Clerk secret key |
| `NEXT_PUBLIC_API_URL` | Yes | Backend API URL |
| `DATABASE_URL` | Yes | Neon PostgreSQL connection string |
| `REDIS_URL` | No | Redis connection string |
| `LLM_API_KEY` | No | OpenAI API key (for AI features) |
| `OBJECT_STORAGE_*` | No | S3-compatible storage (for documents) |

---

## License

Government of India — Smart India Hackathon 2026

---

**Built for SIH 2026 by the SANKHYA AI team**
