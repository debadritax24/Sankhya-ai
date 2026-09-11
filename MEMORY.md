# SANKHYA AI — Project Memory

> **SIH 2026 | Problem Statement 26101**
> Continuously updated after every task

---

## Current Architecture

| Component | Technology | Status |
|-----------|-----------|--------|
| Framework | Next.js 16+ (App Router) | Installed |
| Language | TypeScript 5+ (strict) | Installed |
| Styling | Tailwind CSS v4 | Installed |
| Components | Custom (shadcn/ui pattern) | Active |
| Charts | Recharts | Installed |
| Animation | Framer Motion | Installed |
| Smooth Scroll | Lenis | Installed |
| Auth | Clerk (v7.9.2) | Installed |
| Icons | lucide-react | Installed |
| Package Manager | npm | Active |

### Backend
| Component | Technology | Status |
|-----------|-----------|--------|
| Framework | FastAPI 0.141.1 | Installed |
| Language | Python 3.14 | Installed |
| ORM | SQLAlchemy 2.x (async) | Installed |
| Database Driver | asyncpg | Installed |
| Migrations | Alembic | Installed |
| Cache | Redis (async) | Installed |
| Auth | Clerk JWT verification | Implemented |
| AI | OpenAI API (ready) | Installed |
| Vector DB | PostgreSQL + pgvector | Ready |
| Object Storage | boto3 (S3-compatible) | Installed |

---

## Completed Work

- [x] Project initialization with Next.js 16+
- [x] TypeScript configuration (strict mode)
- [x] Tailwind CSS v4 with government palette
- [x] Dependencies installed (Framer Motion, Lenis, Clerk, Recharts, class-variance-authority, clsx, tailwind-merge, lucide-react)
- [x] AGENTS.md created (engineering constitution)
- [x] SKILL.md created (technical skills reference)
- [x] MEMORY.md created (project memory)
- [x] Design system established (government navy, saffron accent, green status)
- [x] Lenis smooth scrolling configured (with reduced-motion support)
- [x] ClerkProvider with government theme
- [x] Root layout with ClerkProvider + SmoothScrollProvider
- [x] UI primitives: Button, Card, Badge, ProgressBar, StatCard, PageHeader, SectionHeader, SearchInput, Breadcrumb, EmptyState, Skeleton
- [x] Layout components: Header, Footer, MainLayout, Sidebar (role-aware, collapsible), AppLayout
- [x] Types defined in src/types/index.ts
- [x] Mock data in src/lib/constants/mock-data.ts
- [x] Landing page built (/)
- [x] About page (/about)
- [x] How It Works page (/how-it-works)
- [x] Competency Framework page (/competency-framework)
- [x] Learning Ecosystem page (/learning-ecosystem)
- [x] Security page (/security)
- [x] Help page (/help)
- [x] Contact page (/contact)
- [x] Clerk sign-in/sign-up pages
- [x] Learner dashboard (/dashboard)
- [x] Profile page (/profile)
- [x] Competency page (/competency)
- [x] Skill Gap Analysis (/skill-gap)
- [x] Skill Gap Detail (/skill-gap/[id])
- [x] Skill DNA visualization (/skill-dna) with RadarChart
- [x] Learning catalog (/learning)
- [x] Course detail (/learning/[courseId])
- [x] Learning progress (/learning/progress)
- [x] Assessments list (/assessments)
- [x] Assessment attempt (/assessments/[assessmentId]/attempt)
- [x] AI Tutor chat (/ai-tutor)
- [x] Career Path (/career-path)
- [x] Notifications (/notifications)
- [x] Admin dashboard (/admin) with BarChart
- [x] Admin workforce (/admin/workforce)
- [x] Admin competencies (/admin/competencies)
- [x] Admin skill gaps (/admin/skill-gaps)
- [x] Admin learning (/admin/learning)
- [x] Admin assessments (/admin/assessments)
- [x] Admin emerging skills (/admin/emerging-skills)
- [x] Admin departments (/admin/departments)
- [x] Admin reports (/admin/reports)
- [x] Admin settings (/admin/settings)
- [x] Trainer dashboard (/trainer)
- [x] Trainer content management (/trainer/content)
- [x] Trainer content upload (/trainer/content/upload) with pipeline visualization
- [x] Trainer assessments (/trainer/assessments)
- [x] Trainer AI assessment generator (/trainer/assessments/create)
- [x] Typecheck passes (0 errors)
- [x] Lint passes (0 warnings)
- [x] Production build passes

---

## Current UI Direction

**WHITE / LIGHT MINIMAL GOVERNMENT UI**

- Primary background: White (#ffffff)
- Primary color: Government navy (#0c2340)
- Accent: Indian saffron (#ff9933) — used sparingly
- Success/Status: Green (#138808)
- Text: Dark charcoal (#1a1a1a)
- Structure: Neutral gray palette

---

## Backend Architecture

### Project Structure
```
backend/
├── app/
│   ├── main.py                    # FastAPI app, startup/shutdown, health
│   ├── core/
│   │   ├── config.py              # Pydantic settings (env vars)
│   │   ├── database.py            # SQLAlchemy async engine + session
│   │   ├── redis.py               # Redis async client + cache helpers
│   │   ├── security.py            # Clerk JWT verification + RBAC
│   │   ├── enums.py               # UserRole, CompetencyLevel, etc.
│   │   ├── logging.py             # Structured logging (structlog)
│   │   └── logging_middleware.py   # Request ID + timing middleware
│   ├── models/                    # SQLAlchemy ORM models (27 tables)
│   ├── schemas/                   # Pydantic v2 request/response models
│   ├── api/v1/                    # FastAPI routers (13 files)
│   ├── services/                  # Business logic layer (11 services)
│   ├── ai/                        # AI/RAG components (ready for implementation)
│   └── integrations/              # iGOT/TPAC adapters (ready for implementation)
├── migrations/                    # Alembic migrations
├── tests/                         # Pytest tests
├── seed.py                        # Idempotent seed data
├── run_migration.py               # Direct migration runner
└── requirements.txt               # Python dependencies
```

### Database Tables (27)
users, departments, organizations, competency_domains, competencies, skills, role_competencies, user_competencies, competency_evidence, skill_gaps, courses, course_skills, learning_progress, recommendations, learning_paths, assessments, assessment_questions, assessment_attempts, assessment_answers, notifications, ai_conversations, ai_messages, documents, document_chunks, embeddings, audit_logs, training_programmes

### API Endpoints (30)
| Method | Endpoint | Auth |
|--------|----------|------|
| GET | /health | Public |
| GET | /health/ready | Public |
| GET | /api/v1/users/me | Learner |
| GET | /api/v1/users/{user_id} | Learner |
| GET | /api/v1/competencies | Public |
| GET | /api/v1/competencies/{id} | Public |
| GET | /api/v1/competencies/{id}/skills | Public |
| GET | /api/v1/competencies/me/competencies | Learner |
| PUT | /api/v1/competencies/me/competencies/{id} | Learner |
| GET | /api/v1/skill-gaps | Learner |
| GET | /api/v1/skill-gaps/{skill_id} | Learner |
| GET | /api/v1/courses | Public |
| GET | /api/v1/courses/{course_id} | Public |
| GET | /api/v1/learning/progress | Learner |
| PUT | /api/v1/learning/progress/{course_id} | Learner |
| GET | /api/v1/assessments | Learner |
| GET | /api/v1/assessments/{id} | Learner |
| POST | /api/v1/assessments/{id}/attempt | Learner |
| POST | /api/v1/assessments/{id}/submit | Learner |
| GET | /api/v1/assessments/results/{attempt_id} | Learner |
| GET | /api/v1/recommendations | Learner |
| POST | /api/v1/documents/upload | Trainer |
| GET | /api/v1/documents/{id} | Trainer |
| POST | /api/v1/ai-tutor/conversations | Learner |
| GET | /api/v1/ai-tutor/conversations/{id} | Learner |
| POST | /api/v1/ai-tutor/conversations/{id}/messages | Learner |
| GET | /api/v1/analytics/learner | Learner |
| GET | /api/v1/analytics/admin | Admin |
| GET | /api/v1/notifications | Learner |
| PUT | /api/v1/notifications/{id}/read | Learner |

### Services (11)
- UserService — CRUD, Clerk mapping
- CompetencyService — domains, skills, user levels, summary
- SkillGapService — gap calculation from role vs actual
- CourseService — catalog, search
- LearningService — progress tracking
- AssessmentService — attempts, grading, competency updates
- RecommendationService — weighted ranking (cached)
- TutorService — conversation management
- AnalyticsService — learner + admin analytics
- DocumentService — upload, status tracking
- RecommendationService — deterministic ranking engine

### Backend Commands
```bash
cd backend
source venv/bin/activate
python run_migration.py     # Create tables on Neon
python seed.py              # Populate seed data
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000  # Start server
```

---

## Complete Route Map

### Public Routes (no auth required)
| Route | Page | Status |
|-------|------|--------|
| `/` | Landing page | Done |
| `/about` | About SANKHYA AI | Done |
| `/how-it-works` | How It Works | Done |
| `/competency-framework` | Competency Framework | Done |
| `/learning-ecosystem` | Learning Ecosystem | Done |
| `/security` | Security & Privacy | Done |
| `/help` | Help Center | Done |
| `/contact` | Contact | Done |

### Auth Routes
| Route | Page | Status |
|-------|------|--------|
| `/sign-in/[[...sign-in]]` | Clerk Sign In | Done |
| `/sign-up/[[...sign-up]]` | Clerk Sign Up | Done |

### Learner Routes (authenticated)
| Route | Page | Status |
|-------|------|--------|
| `/dashboard` | Learner Dashboard | Done |
| `/profile` | Profile | Done |
| `/competency` | Competency Overview | Done |
| `/skill-gap` | Skill Gap Analysis | Done |
| `/skill-gap/[id]` | Skill Gap Detail | Done |
| `/skill-dna` | Skill DNA Visualization | Done |
| `/learning` | Learning Catalog | Done |
| `/learning/[courseId]` | Course Detail | Done |
| `/learning/progress` | Learning Progress | Done |
| `/assessments` | Assessments List | Done |
| `/assessments/[assessmentId]/attempt` | Assessment Attempt | Done |
| `/ai-tutor` | AI Tutor Chat | Done |
| `/career-path` | Career Path | Done |
| `/notifications` | Notifications | Done |

### Trainer Routes (trainer role)
| Route | Page | Status |
|-------|------|--------|
| `/trainer` | Trainer Dashboard | Done |
| `/trainer/content` | Content Management | Done |
| `/trainer/content/upload` | Upload Material | Done |
| `/trainer/assessments` | Assessment Management | Done |
| `/trainer/assessments/create` | AI Assessment Generator | Done |

### Admin Routes (admin role)
| Route | Page | Status |
|-------|------|--------|
| `/admin` | Admin Dashboard | Done |
| `/admin/workforce` | Workforce Analytics | Done |
| `/admin/competencies` | Competency Overview | Done |
| `/admin/skill-gaps` | Skill Gaps Overview | Done |
| `/admin/learning` | Learning Overview | Done |
| `/admin/assessments` | Assessments Overview | Done |
| `/admin/emerging-skills` | Emerging Skills | Done |
| `/admin/departments` | Departments | Done |
| `/admin/reports` | Reports & Analytics | Done |
| `/admin/settings` | System Settings | Done |

---

## Components Created

### UI Primitives
- Button (8 variants: default, destructive, outline, secondary, ghost, link, accent, success)
- Card (CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
- Badge (7 variants: default, secondary, outline, success, warning, error, accent)
- ProgressBar (with color and size variants)
- StatCard (label + value)
- PageHeader (title + description + actions)
- SectionHeader (title + description)
- SearchInput (with icon)
- Breadcrumb (auto-generated from href)
- EmptyState (icon + title + description + action)
- Skeleton (animated loading placeholder)

### Layout Components
- Header (gov top bar + nav + search + notifications + UserButton + mobile menu)
- Footer (4-column with gov identity)
- MainLayout (Header + Footer wrapper)
- Sidebar (role-aware: learner/trainer/admin, collapsible)
- AppLayout (Sidebar + breadcrumbs + content)

### Providers
- ClerkProvider (gov theme: navy primary)
- SmoothScrollProvider (Lenis with reduced-motion support)

---

## Mock Data Entities (src/lib/constants/mock-data.ts)

- currentUser (User) — Dr. Ananya Sharma, Junior Statistical Officer
- competencies (12) — Python, SQL, Survey Design, Data Viz, Statistics, AI/ML, R, GIS, Communication, Leadership, Research Methods, NSSO Framework
- skillGaps (7) — Skill gaps with severity and competency mapping
- courses (9) — iGOT and internal courses
- assessments (5) — Diagnostic, adaptive, practice, recommended
- learningProgress (3) — Course progress tracking
- notifications (5) — System, learning, assessment notifications
- departments (5) — NSO, Data Analytics, Survey Design, IT, Training
- conversations — AI tutor conversation history
- competencyDomainSummaries — Domain-level competency stats for radar chart
- competencyStats — Overall competency statistics

---

## Design Decisions

| Decision | Rationale |
|----------|-----------|
| Custom components over shadcn/ui CLI | Full control, government palette integration |
| Recharts over D3 | React-native, SVG-based, RadarChart for Skill DNA |
| Lenis for smooth scrolling | Lightweight, respects reduced-motion preference |
| Server Components by default | Reduced client JS, faster initial loads |
| App Router layouts | Role-based shell (learner, trainer, admin) |
| Inter font | Professional sans-serif, good readability |
| Government navy primary | Official, trustworthy, authoritative |
| Role-aware Sidebar | Different navigation for learner/trainer/admin |

---

## Authentication Decisions

| Decision | Choice |
|----------|--------|
| Auth provider | Clerk (v7.9.2) |
| Route protection | Clerk Middleware (pending setup) |
| Role storage | Clerk public metadata |
| Default role | LEARNER |
| Roles | LEARNER, TRAINER, ADMIN, SUPER_ADMIN |
| Theme colors | Navy primary, white background |

---

## Dependencies

### Production
| Package | Version | Purpose |
|---------|---------|---------|
| next | 16.3.4 | Framework |
| react | 19.2.8 | UI library |
| react-dom | 19.2.8 | React DOM |
| framer-motion | 12.23.12 | Animations |
| @clerk/nextjs | 7.9.2 | Authentication |
| recharts | 2.15.4 | Charts |
| lenis | 1.2.3 | Smooth scrolling |
| clsx | 2.1.1 | Class name utility |
| tailwind-merge | 3.3.1 | Tailwind class merging |
| class-variance-authority | 0.7.1 | Component variants |
| lucide-react | 0.544.0 | Icons |

### Dev
| Package | Version | Purpose |
|---------|---------|---------|
| typescript | 5.8.3 | Type checking |
| tailwindcss | 4.2.1 | CSS framework |
| @tailwindcss/postcss | 4.2.1 | PostCSS integration |
| eslint | 9.39.5 | Linting |
| eslint-config-next | 16.3.4 | Next.js ESLint rules |
| @types/node | 20.19.31 | Node.js types |
| @types/react | 19.2.2 | React types |
| @types/react-dom | 19.2.5 | React DOM types |

---

## Important Technical Decisions

| Decision | Rationale | Reversible? |
|----------|-----------|-------------|
| Next.js App Router | Server Components, role-based layouts | No (core architecture) |
| Custom components | Full control, government palette | No (core UI approach) |
| Clerk auth | Official Next.js integration, handles complexity | No (auth provider) |
| Tailwind v4 | Utility-first, government aesthetic | No (styling approach) |
| Server Components default | Performance, reduced client JS | No (architecture principle) |
| Inter font | Professional, accessible, government-appropriate | Yes (font choice) |
| lucide-react icons | Consistent, lightweight, tree-shakeable | Yes (icon library) |

---

## Pending Work

### Immediate — Backend
- [ ] Run `python run_migration.py` against Neon to create tables
- [ ] Run `python seed.py` to populate competency domains, skills, courses
- [ ] Create Clerk middleware for backend JWT verification (needs real keys)
- [ ] Implement AI infrastructure (document processing, embeddings, RAG)
- [ ] Implement iGOT/TPAC integration adapters
- [ ] Add Redis caching to analytics and recommendation endpoints
- [ ] Add background job system for document processing
- [ ] Write tests for authentication, authorization, core services

### Immediate — Frontend
- [ ] Add Clerk middleware for route protection (`src/middleware.ts`)
- [ ] Add missing routes: `/learning/recommended`, `/learning/igot`, `/learning/tpac`
- [ ] Add `/assessments/[assessmentId]` (pre-attempt summary page)
- [ ] Add `/assessments/results/[attemptId]` (results page)
- [ ] Add `/ai-tutor/[conversationId]` (conversation detail)
- [ ] Add `/competency/[domain]` (domain detail page)

### SIH Presentation Polish (7 Key Screens)
- [ ] Landing page — refine hero, stats, features
- [ ] Login page — add government branding
- [ ] Learner Dashboard — polish layout, add more charts
- [ ] Skill Gap Analysis — improve visual hierarchy
- [ ] Recommended Learning — enhance course cards
- [ ] AI Assessment — polish attempt UI
- [ ] Admin Analytics — add more insights

### Future
- [ ] Clerk middleware for actual route protection (needs real keys)
- [ ] E2E tests with Playwright
- [ ] Storybook for component documentation
- [ ] CI/CD pipeline
- [ ] Performance monitoring (Web Vitals)
- [ ] Accessibility auditing (Lighthouse)
- [ ] Internationalization (Hindi support)
- [ ] PWA support

---

## Known Issues

| Issue | Status | Impact |
|-------|--------|--------|
| Clerk placeholder keys | Needs real keys | Auth won't work until keys provided |
| No Clerk middleware (frontend) | Not yet configured | Frontend routes not protected |
| No Clerk middleware (backend) | JWT verification ready, needs real keys | Backend auth endpoints return 401 |
| Neon DATABASE_URL | Configured in .env | Tables not yet created (run `python run_migration.py`) |
| Redis not running locally | Cache fallback (graceful) | Recommendations/analytics uncached |
| AI/ML not implemented | Services stubbed | RAG, MCQ generation, tutor responses are placeholder |
| iGOT/TPAC not integrated | Adapters ready | External course data is mock |
| `colorText` in Clerk Variables | Removed (not in type) | Minor theming limitation |

---

## Decisions That Must NOT Be Reversed

1. **App Router** — Do not switch to Pages Router
2. **Custom components** — Do not switch to Material UI or Chakra
3. **Clerk** — Do not implement fake auth
4. **Tailwind CSS** — Do not switch to CSS Modules or styled-components
5. **Server Components default** — Do not make everything Client Components
6. **Government aesthetic** — Do not make it look like a SaaS startup
7. **No .env.example** — Never create alternative env files
8. **TypeScript strict** — Never use `any` types
9. **Lenis** — Do not replace with another smooth scroll library
10. **Recharts** — Do not replace with D3 or Chart.js
11. **lucide-react** — Do not replace with another icon library

---

*Last updated: 2026-09-11 (Backend Phase 1-6 complete)*
# Sankhya AI - Project Memory

## What Was Completed
- Configured FastAPI backend to explicitly load the single source of truth `.env` file from the project root (`ROOT/.env`), satisfying the strict environment requirement.
- Modified `backend/app/core/config.py` to use `pathlib` for a robust absolute path resolution to the root `.env` rather than fragile relative paths.
- Removed unnecessary `backend/.env` copies to maintain a single source of truth.
- Configured `Pydantic` settings to tolerate extra Next.js frontend variables (`extra = "ignore"`).
- Refactored `DATABASE_URL` parsing to dynamically strip `channel_binding=require` specifically for the `asyncpg` driver in both `app/core/database.py` and `run_migration.py`, ensuring connection works seamlessly on Neon.
- Implemented requested API endpoints including `GET /` (root) and updated `/health/ready` to `GET /health/db`.
- Ran Alembic migrations successfully to verify the complete 27-table database schema (including users, competencies, assessments, pgvector embeddings).

## Files Changed
- `backend/app/core/config.py`: Added root `.env` path resolution via `pathlib` and `extra="ignore"`.
- `backend/app/core/database.py`: Stripped unsupported URL parameters for `asyncpg`.
- `backend/app/main.py`: Added `GET /` and `GET /health/db`.
- `backend/run_migration.py`: Fixed `asyncpg` URL parsing issue to allow successful verification of the schema.
- `backend/requirements.txt`: Unpinned dependencies (`pydantic-core`, `tiktoken`, `asyncpg`) to support Python 3.14 wheel compilation.

## Database Changes
- None directly from the frontend, but verified 27 tables are fully deployed and structurally compliant in Neon PostgreSQL, including `pgvector` extensions and tables like `document_chunks` and `embeddings`.

## Migration Status
- Migration script (`run_migration.py`) successfully executed and verified all 27 tables. Status: COMPLETE.

## API Changes
- Added `GET /` returning basic API info.
- Renamed `/health/ready` to `/health/db` as requested.

## Architecture Decisions
- Used `pathlib` to dynamically evaluate the path from the deeply nested config file back to the project root, satisfying the monorepo constraint.
- Next.js environment variables (like `NEXT_PUBLIC_API_URL`) are ignored by the backend dynamically using Pydantic's `extra="ignore"` constraint.
- Next.js requires `sslmode=require` and `channel_binding=require` for Prisma/Neon edge connections, but Python `asyncpg` rejects `channel_binding`. Rather than editing `.env` and breaking the frontend, we handle protocol cleaning dynamically in the Python runtime.

## Unresolved Issues
- Redis `redis://localhost:6379/0` is currently throwing a connection refused warning on startup if Redis is not running locally. The backend gracefully continues, but it will need to be configured for caching later.
- AI features (`openai`, `tiktoken`) are wired up but `LLM_API_KEY` needs to be provided in `.env` when executing AI routes.

## Next Steps
- Implement specific versioned endpoints (e.g. `/api/v1/users`, `/api/v1/competencies`).
- Flesh out the RAG endpoints using `pgvector` for semantic similarity search.
- Connect frontend Server Components directly to the new API endpoints.

## RAG & AI Engine Implementation (Sep 11)
- Created the core AI directory structure (`backend/app/ai/`).
- Implemented `embeddings.py` to interface with OpenAI (`text-embedding-3-small`) for generating vector embeddings.
- Implemented `chunking.py` for text pre-processing and overlapping token window chunking.
- Implemented `retrieval.py` which executes a raw SQL `SELECT` to utilize `pgvector`'s `<=>` (cosine distance) operator against the `vector_1536` column in the `embeddings` table.
- Implemented `rag.py` to perform semantic search context retrieval and inject chunks into an LLM system prompt.
- Implemented `recommendation_engine.py` to generate explicit LLM-based reasoning for course recommendations based on the user's role and specific skill gap math.
- Implemented `assessment_generator.py` to force grounded MCQ generation outputting raw JSON arrays based strictly on retrieved context.
- Implemented `competency_engine.py` with deterministic gap calculation logic (`Target Level - Current Level`).
