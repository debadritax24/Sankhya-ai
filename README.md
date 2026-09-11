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

27 tables on Neon PostgreSQL with pgvector. All tables use `String(36)` UUID primary keys and `DateTime` timestamps.

### Users & Organizations

#### `users`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | String(36) | PK |
| `clerk_user_id` | String(64) | UNIQUE, NOT NULL, INDEX |
| `email` | String(255) | UNIQUE, NOT NULL, INDEX |
| `name` | String(255) | NOT NULL |
| `designation` | String(255) | nullable |
| `department_id` | String(36) | FK → `departments.id` |
| `role_id` | String(50) | NOT NULL, default `"LEARNER"` |
| `organization_id` | String(36) | FK → `organizations.id` |
| `experience_years` | Integer | nullable |
| `education` | Text | nullable |
| `current_assignment` | Text | nullable |
| `career_goal` | Text | nullable |
| `created_at` | DateTime | default utcnow |
| `updated_at` | DateTime | default utcnow, onupdate |

#### `departments`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | String(36) | PK |
| `name` | String(255) | UNIQUE, NOT NULL |
| `code` | String(50) | UNIQUE, NOT NULL |
| `description` | Text | nullable |
| `created_at` | DateTime | default utcnow |

#### `organizations`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | String(36) | PK |
| `name` | String(255) | UNIQUE, NOT NULL |
| `code` | String(50) | UNIQUE, NOT NULL |
| `parent_id` | String(36) | nullable (self-ref) |
| `created_at` | DateTime | default utcnow |

---

### Competencies

#### `competency_domains`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | String(36) | PK |
| `name` | String(100) | UNIQUE, NOT NULL |
| `code` | String(50) | UNIQUE, NOT NULL |
| `description` | Text | nullable |
| `created_at` | DateTime | default utcnow |

#### `competencies`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | String(36) | PK |
| `name` | String(255) | NOT NULL |
| `domain_id` | String(36) | FK → `competency_domains.id` |
| `description` | Text | nullable |
| `created_at` | DateTime | default utcnow |

#### `skills`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | String(36) | PK |
| `name` | String(255) | NOT NULL |
| `competency_id` | String(36) | FK → `competencies.id` |
| `description` | Text | nullable |
| `created_at` | DateTime | default utcnow |

#### `role_competencies`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | String(36) | PK |
| `role_id` | String(50) | NOT NULL, INDEX |
| `competency_id` | String(36) | FK → `competencies.id` |
| `required_level` | Integer | NOT NULL |
| `created_at` | DateTime | default utcnow |

#### `user_competencies`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | String(36) | PK |
| `user_id` | String(36) | FK → `users.id`, INDEX |
| `competency_id` | String(36) | FK → `competencies.id`, INDEX |
| `current_level` | Integer | NOT NULL, default 1 |
| `target_level` | Integer | NOT NULL, default 3 |
| `confidence` | Float | default 0.5 |
| `last_assessed_at` | DateTime | nullable |
| `source` | String(50) | nullable |
| `created_at` | DateTime | default utcnow |
| `updated_at` | DateTime | default utcnow, onupdate |

#### `competency_evidence`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | String(36) | PK |
| `user_competency_id` | String(36) | FK → `user_competencies.id` |
| `evidence_type` | String(50) | NOT NULL |
| `description` | Text | nullable |
| `source` | String(255) | nullable |
| `created_at` | DateTime | default utcnow |

---

### Skill Gaps

#### `skill_gaps`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | String(36) | PK |
| `user_id` | String(36) | FK → `users.id`, INDEX |
| `skill_id` | String(36) | FK → `skills.id`, INDEX |
| `current_level` | Integer | NOT NULL |
| `required_level` | Integer | NOT NULL |
| `gap_score` | Float | NOT NULL |
| `priority` | String(20) | NOT NULL, INDEX |
| `reason` | Text | nullable |
| `created_at` | DateTime | default utcnow |
| `updated_at` | DateTime | default utcnow, onupdate |

---

### Courses & Learning

#### `courses`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | String(36) | PK |
| `title` | String(500) | NOT NULL |
| `description` | Text | nullable |
| `provider` | String(100) | NOT NULL |
| `source` | String(50) | NOT NULL, INDEX |
| `external_id` | String(255) | nullable |
| `url` | Text | nullable |
| `duration_minutes` | Integer | nullable |
| `difficulty` | String(20) | nullable |
| `language` | String(50) | default `"en"` |
| `status` | String(20) | default `"ACTIVE"`, INDEX |
| `created_at` | DateTime | default utcnow |
| `updated_at` | DateTime | default utcnow, onupdate |

#### `course_skills`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | String(36) | PK |
| `course_id` | String(36) | FK → `courses.id`, INDEX |
| `skill_id` | String(36) | FK → `skills.id`, INDEX |
| `relevance_score` | Float | default 1.0 |

#### `learning_progress`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | String(36) | PK |
| `user_id` | String(36) | FK → `users.id`, INDEX |
| `course_id` | String(36) | FK → `courses.id`, INDEX |
| `status` | String(20) | default `"NOT_STARTED"`, INDEX |
| `progress_percentage` | Float | default 0.0 |
| `started_at` | DateTime | nullable |
| `completed_at` | DateTime | nullable |
| `learning_minutes` | Integer | default 0 |
| `last_activity_at` | DateTime | nullable, INDEX |
| `created_at` | DateTime | default utcnow |

#### `recommendations`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | String(36) | PK |
| `user_id` | String(36) | FK → `users.id`, INDEX |
| `course_id` | String(36) | FK → `courses.id` |
| `skill_gap_id` | String(36) | FK → `skill_gaps.id` |
| `rank` | Integer | NOT NULL |
| `reason` | Text | nullable |
| `score` | Float | default 0.0 |
| `created_at` | DateTime | default utcnow |

#### `learning_paths`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | String(36) | PK |
| `user_id` | String(36) | FK → `users.id`, INDEX |
| `title` | String(500) | NOT NULL |
| `description` | Text | nullable |
| `course_ids` | Text | nullable (JSON-encoded) |
| `created_at` | DateTime | default utcnow |

#### `training_programmes`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | String(36) | PK |
| `title` | String(500) | NOT NULL |
| `provider` | String(100) | nullable |
| `external_id` | String(255) | nullable |
| `url` | Text | nullable |
| `duration_minutes` | Integer | nullable |
| `language` | String(50) | nullable |
| `created_at` | DateTime | default utcnow |

---

### Assessments

#### `assessments`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | String(36) | PK |
| `title` | String(500) | NOT NULL |
| `type` | String(50) | NOT NULL |
| `status` | String(20) | default `"upcoming"` |
| `competency_id` | String(36) | FK → `competencies.id` |
| `competency_name` | String(255) | nullable |
| `question_count` | Integer | default 0 |
| `duration_minutes` | Integer | default 30 |
| `difficulty` | String(20) | default `"Medium"` |
| `reason` | Text | nullable |
| `created_at` | DateTime | default utcnow |

#### `assessment_questions`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | String(36) | PK |
| `assessment_id` | String(36) | FK → `assessments.id`, INDEX |
| `question` | Text | NOT NULL |
| `options` | JSON | NOT NULL |
| `correct_answer` | Integer | NOT NULL |
| `explanation` | Text | nullable |
| `difficulty` | String(20) | default `"Medium"` |
| `skill_id` | String(36) | FK → `skills.id` |
| `source_document_id` | String(36) | nullable |
| `confidence` | Float | default 0.5 |
| `status` | String(20) | default `"pending"` |
| `created_at` | DateTime | default utcnow |

#### `assessment_attempts`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | String(36) | PK |
| `user_id` | String(36) | FK → `users.id`, INDEX |
| `assessment_id` | String(36) | FK → `assessments.id`, INDEX |
| `score` | Float | nullable |
| `accuracy` | Float | nullable |
| `passed` | Boolean | nullable |
| `started_at` | DateTime | default utcnow |
| `completed_at` | DateTime | nullable |
| `time_taken_seconds` | Integer | nullable |
| `created_at` | DateTime | default utcnow |

#### `assessment_answers`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | String(36) | PK |
| `attempt_id` | String(36) | FK → `assessment_attempts.id`, INDEX |
| `question_id` | String(36) | FK → `assessment_questions.id` |
| `selected_answer` | Integer | NOT NULL |
| `is_correct` | Boolean | NOT NULL |
| `time_taken_seconds` | Integer | nullable |

---

### AI & Documents

#### `ai_conversations`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | String(36) | PK |
| `user_id` | String(36) | FK → `users.id`, INDEX |
| `title` | String(500) | nullable |
| `created_at` | DateTime | default utcnow |
| `updated_at` | DateTime | default utcnow, onupdate |

#### `ai_messages`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | String(36) | PK |
| `conversation_id` | String(36) | FK → `ai_conversations.id`, INDEX |
| `role` | String(20) | NOT NULL |
| `content` | Text | NOT NULL |
| `sources` | JSON | nullable |
| `created_at` | DateTime | default utcnow |

#### `documents`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | String(36) | PK |
| `filename` | String(500) | NOT NULL |
| `mime_type` | String(100) | NOT NULL |
| `storage_key` | String(500) | NOT NULL |
| `size_bytes` | Integer | NOT NULL |
| `status` | String(20) | default `"UPLOADED"`, INDEX |
| `uploaded_by` | String(36) | FK → `users.id` |
| `created_at` | DateTime | default utcnow |
| `updated_at` | DateTime | default utcnow, onupdate |

#### `document_chunks`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | String(36) | PK |
| `document_id` | String(36) | FK → `documents.id`, INDEX |
| `chunk_index` | Integer | NOT NULL |
| `content` | Text | NOT NULL |
| `metadata` | JSON | nullable |
| `created_at` | DateTime | default utcnow |

#### `embeddings`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | String(36) | PK |
| `chunk_id` | String(36) | FK → `document_chunks.id`, UNIQUE |
| `model` | String(100) | NOT NULL |
| `dimension` | Integer | NOT NULL |
| `created_at` | DateTime | default utcnow |

---

### System

#### `notifications`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | String(36) | PK |
| `user_id` | String(36) | FK → `users.id`, INDEX |
| `title` | String(500) | NOT NULL |
| `message` | Text | nullable |
| `type` | String(50) | NOT NULL |
| `read` | Boolean | default False |
| `created_at` | DateTime | default utcnow |

#### `audit_logs`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | String(36) | PK |
| `user_id` | String(36) | INDEX |
| `action` | String(100) | NOT NULL |
| `resource_type` | String(100) | nullable |
| `resource_id` | String(36) | nullable |
| `details` | JSON | nullable |
| `created_at` | DateTime | default utcnow |

---

### Entity Relationship

```
organizations ──< departments ──< users
                                      │
                    ┌─────────────────┼──────────────────┐
                    ▼                 ▼                   ▼
           user_competencies    skill_gaps        learning_progress
                    │                 │                   │
                    ▼                 ▼                   ▼
              competencies ──< skills ──< course_skills ──< courses
                    │
                    ▼
          competency_domains

users ──< assessment_attempts ──< assessment_answers ──< assessment_questions
users ──< ai_conversations ──< ai_messages
users ──< documents ──< document_chunks ──< embeddings
users ──< recommendations
users ──< notifications
users ──< audit_logs
```

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
