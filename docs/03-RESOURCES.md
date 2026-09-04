# SANKHYA AI — Research & Implementation Resources

> **Document status:** SIH 2026 | Problem Statement 26101
> **Classification:** Resources marked VERIFIED/OFFICIAL have been confirmed publicly accessible. PROTOTYPE/MOCK resources are seeded placeholders used until live integration is available. Never fabricate URLs.

---

## Resource Classification Key

| Tag | Meaning |
|---|---|
| ✅ **VERIFIED/OFFICIAL** | Publicly accessible government or official source |
| 📚 **RESEARCH** | Academic or technical research useful for design decisions |
| 🔧 **OPTIONAL** | Useful but not required for MVP |
| ⚠️ **PROTOTYPE/MOCK** | Referenced in architecture; live access not yet established |

---

## Table of Contents

1. [Official Government Resources](#1-official-government-resources)
2. [SIH Resources](#2-sih-resources)
3. [iGOT Karmayogi Resources](#3-igot-karmayogi-resources)
4. [MoSPI Resources](#4-mospi-resources)
5. [NSSTA / TPAC Resources](#5-nssta--tpac-resources)
6. [Official Statistics Competency Resources](#6-official-statistics-competency-resources)
7. [AI/ML Documentation](#7-aiml-documentation)
8. [RAG Documentation](#8-rag-documentation)
9. [PostgreSQL / pgvector Documentation](#9-postgresql--pgvector-documentation)
10. [FastAPI Documentation](#10-fastapi-documentation)
11. [Next.js Documentation](#11-nextjs-documentation)
12. [Security Standards & Guidelines](#12-security-standards--guidelines)
13. [API Integration Resources](#13-api-integration-resources)
14. [Dataset Resources](#14-dataset-resources)
15. [Research Papers](#15-research-papers)
16. [Useful Open-Source Libraries](#16-useful-open-source-libraries)
17. [UI/UX Inspiration](#17-uiux-inspiration)
18. [Testing Tools](#18-testing-tools)
19. [Deployment Resources](#19-deployment-resources)

---

## 1. Official Government Resources

### ✅ VERIFIED/OFFICIAL

| Name | Purpose | URL | Why it matters | SANKHYA AI Usage |
|---|---|---|---|---|
| **MoSPI Official Website** | Ministry of Statistics & Programme Implementation — the problem-statement issuing body | https://mospi.gov.in | Understanding the organizational context, departments, and statistical divisions | Competency framework domain alignment |
| **National Statistical Office (NSO)** | Primary arm of MoSPI for data collection and analysis | https://mospi.gov.in/national-statistical-office | Understanding NSO roles → job role mapping in competency framework | Job role definitions for Statistical Officer, Data Analyst roles |
| **DARPG (Dept. of Administrative Reforms)** | Governs training frameworks for civil services | https://darpg.gov.in | Training policy context for TPAC and iGOT alignment | Policy compliance framing |
| **Digital India Programme** | Context for digital governance competencies | https://digitalindia.gov.in | Digital literacy requirements in the competency taxonomy | Digital Governance competency domain |
| **National Informatics Centre (NIC)** | IT infrastructure provider for government; potential SSO source | https://www.nic.in | NIC SSO/LDAP may be relevant for production authentication | Future SSO integration |

---

## 2. SIH Resources

### ✅ VERIFIED/OFFICIAL

| Name | Purpose | URL | Why it matters | SANKHYA AI Usage |
|---|---|---|---|---|
| **Smart India Hackathon Official Portal** | SIH 2026 registration, problem statements, rules | https://www.sih.gov.in | Primary source for PS 26101 requirements | Problem statement alignment |
| **SIH Problem Statement Guidelines** | Evaluation criteria, submission format | Available on SIH portal | Judges evaluate based on these criteria | All documentation and demo align to evaluation rubric |
| **SIH Judging Rubric** | Technical innovation, scalability, impact, feasibility | Available on SIH portal | Understand what scores points | Architecture decisions justified against rubric |

---

## 3. iGOT Karmayogi Resources

### ✅ VERIFIED/OFFICIAL

| Name | Purpose | URL | Why it matters | SANKHYA AI Usage |
|---|---|---|---|---|
| **iGOT Karmayogi Platform** | Central government learning platform | https://igotkarmayogi.gov.in | Primary course source for recommendations | iGOT adapter target; course content for RAG ingestion |
| **Mission Karmayogi** | Policy framework for civil service capacity building | https://dopt.gov.in/mission-karmayogi | Alignment of SANKHYA AI with national capacity building mission | Architecture narrative and positioning |
| **Karmayogi Bharat** | Implementing body for Mission Karmayogi | https://karmayogibharat.gov.in | Competency framework standards used by iGOT | Competency taxonomy alignment |

### ⚠️ PROTOTYPE/MOCK

| Name | Purpose | Status | SANKHYA AI Usage |
|---|---|---|---|
| **iGOT Public API** | Programmatic access to course catalogue | Not publicly documented at time of writing. Registration required through iGOT administrator channel. | SANKHYA AI iGOT adapter uses mock data with same contract until official access is granted. Never claim live integration. |

---

## 4. MoSPI Resources

### ✅ VERIFIED/OFFICIAL

| Name | Purpose | URL | Why it matters | SANKHYA AI Usage |
|---|---|---|---|---|
| **MoSPI Annual Reports** | Organizational priorities, statistical programme areas | https://mospi.gov.in/publication | Understanding which statistical competencies are organizationally critical | Weighting competency importance in gap engine |
| **National Statistical Commission** | Governance body; statistical standards | https://nscgoi.gov.in | Statistical methodology standards relevant to competency taxonomy | Statistical Methods competency domain |
| **SDDS Plus / Data Dissemination Standards** | IMF/UN standard adopted by India for official statistics | https://mospi.gov.in/international-standards | International competency requirements for statistical officials | Metadata Standards competency |
| **SDG India Index** | India's SDG monitoring framework | https://sdgindiaindex.niti.gov.in | SDG competency requirements for officials | SDG Indicators competency in framework |

---

## 5. NSSTA / TPAC Resources

### ✅ VERIFIED/OFFICIAL

| Name | Purpose | URL | Why it matters | SANKHYA AI Usage |
|---|---|---|---|---|
| **NSSTA (National Statistical Systems Training Academy)** | MoSPI's training institution for official statistics | https://www.mospi.gov.in/nssta | Primary TPAC programme source | TPAC adapter target; training catalogue |
| **NSSTA Training Programmes** | Listing of methodology and software training programmes | https://www.mospi.gov.in/nssta (training section) | Understand TPAC course types (in-person, blended, nomination-based) | TPAC adapter normalization logic |

### ⚠️ PROTOTYPE/MOCK

| Name | Purpose | Status | SANKHYA AI Usage |
|---|---|---|---|
| **NSSTA/TPAC Course API** | Programmatic access to training catalogue | Not publicly available. Requires NSSTA institutional agreement. | TPAC adapter uses seeded mock data based on known programme types. |

---

## 6. Official Statistics Competency Resources

### ✅ VERIFIED/OFFICIAL

| Name | Purpose | URL | Why it matters | SANKHYA AI Usage |
|---|---|---|---|---|
| **UN Generic Activity Model for Statistical Organizations (GAMSO)** | Statistical process framework | https://statswiki.unece.org/display/GAMSO | Defines statistical activities → maps to competency domains | Statistical Methods competency taxonomy |
| **Generic Statistical Business Process Model (GSBPM)** | International standard for statistical production | https://statswiki.unece.org/display/GSBPM | Competency requirements per statistical phase | Competency framework alignment |
| **UN Competency Development Programme for Stats** | UN Statistics Division capacity building resources | https://unstats.un.org/capacity-development | Official competency definitions for statistical officials globally | Competency framework seed data |
| **Paris 21 Capacity Development** | Statistical capacity development frameworks | https://paris21.org/capacity-development | National capacity building standards | Competency importance weighting |

### 📚 RESEARCH

| Name | Purpose | URL | Why it matters | SANKHYA AI Usage |
|---|---|---|---|---|
| **OECD PIAAC Survey (Skills Framework)** | Adult competency measurement methodology | https://www.oecd.org/skills/piaac/ | Competency measurement research — informs scoring approach | Multi-signal scoring design |

---

## 7. AI/ML Documentation

### ✅ VERIFIED/OFFICIAL

| Name | Purpose | URL | Why it matters | SANKHYA AI Usage |
|---|---|---|---|---|
| **Google AI for Developers (Gemini)** | Gemini API documentation | https://ai.google.dev/docs | Primary LLM provider documentation | LLM provider implementation |
| **Google Cloud Vertex AI** | Enterprise Gemini access, data residency | https://cloud.google.com/vertex-ai | Production LLM access with India data residency | Production LLM deployment |
| **OpenAI API Reference** | Fallback LLM provider | https://platform.openai.com/docs | Alternative provider documentation | Fallback LLM implementation |
| **Ollama** | Local LLM runtime for offline demo | https://ollama.ai | Run LLMs locally — critical for offline demo fallback | Offline demo mode |
| **Hugging Face Model Hub** | Pre-trained embedding models | https://huggingface.co/models | sentence-transformers, multilingual embedding models | Local embedding fallback |
| **sentence-transformers** | Python library for embedding generation | https://www.sbert.net | Standard library for semantic embeddings | Embedding generation in worker |
| **scikit-learn** | ML algorithms for forecasting | https://scikit-learn.org | Gradient boosting, random forest for future skill prediction | Forecasting engine (advanced) |

### 📚 RESEARCH

| Name | Purpose | URL | Why it matters | SANKHYA AI Usage |
|---|---|---|---|---|
| **Item Response Theory (IRT)** | Psychometric model for adaptive testing | https://en.wikipedia.org/wiki/Item_response_theory | Theoretical basis for advanced adaptive assessment | Adaptive assessment engine (roadmap) |

---

## 8. RAG Documentation

### ✅ VERIFIED/OFFICIAL

| Name | Purpose | URL | Why it matters | SANKHYA AI Usage |
|---|---|---|---|---|
| **Anthropic RAG Guide** | Best practices for retrieval-augmented generation | https://docs.anthropic.com/en/docs/build-with-claude/retrieval-augmented-generation | Chunking strategy, retrieval patterns, prompt design | RAG pipeline design |
| **Google RAG with Gemini** | Gemini-specific RAG implementation | https://ai.google.dev/gemini-api/docs/grounding | Grounding Gemini responses to documents | AI Tutor grounding |
| **pgvector RAG Tutorial** | Building RAG with PostgreSQL and pgvector | https://github.com/pgvector/pgvector-python | Implementation reference for embedding + retrieval | Document ingestion pipeline |
| **PyMuPDF Documentation** | PDF text extraction | https://pymupdf.readthedocs.io | Best Python PDF parser for structured extraction | Document parser |
| **python-docx** | DOCX text extraction | https://python-docx.readthedocs.io | DOCX parsing for training documents | Document parser |

### 📚 RESEARCH

| Name | Purpose | URL | Why it matters | SANKHYA AI Usage |
|---|---|---|---|---|
| **"Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks" (Lewis et al.)** | Original RAG paper | https://arxiv.org/abs/2005.11401 | Theoretical foundation for SANKHYA AI's RAG architecture | RAG design decisions |
| **"Lost in the Middle" (Liu et al.)** | Research on where LLMs attend in long contexts | https://arxiv.org/abs/2307.03172 | Informs chunk positioning and retrieval ordering strategy | Chunk retrieval ordering |

---

## 9. PostgreSQL / pgvector Documentation

### ✅ VERIFIED/OFFICIAL

| Name | Purpose | URL | Why it matters | SANKHYA AI Usage |
|---|---|---|---|---|
| **PostgreSQL 16 Documentation** | Official PostgreSQL docs | https://www.postgresql.org/docs/16/ | Database implementation reference | All database operations |
| **pgvector GitHub** | Vector extension source and docs | https://github.com/pgvector/pgvector | IVFFlat index setup, cosine similarity queries | Embedding store and retrieval |
| **pgvector Python client** | Python examples for pgvector | https://github.com/pgvector/pgvector-python | Embedding insertion and query code | document_chunks embedding ops |
| **SQLAlchemy Async Docs** | Async SQLAlchemy 2.0 | https://docs.sqlalchemy.org/en/20/orm/extensions/asyncio.html | Async database sessions in FastAPI | Database layer |
| **Alembic Documentation** | Database migration tool | https://alembic.sqlalchemy.org | Schema migrations for iterative development | DB schema management |
| **asyncpg** | Fast async PostgreSQL driver | https://magicstack.github.io/asyncpg/ | Underlying driver for async SQLAlchemy | DB performance |

---

## 10. FastAPI Documentation

### ✅ VERIFIED/OFFICIAL

| Name | Purpose | URL | Why it matters | SANKHYA AI Usage |
|---|---|---|---|---|
| **FastAPI Official Docs** | Complete framework documentation | https://fastapi.tiangolo.com | Primary backend development reference | Entire API layer |
| **FastAPI Advanced User Guide** | Dependency injection, background tasks, WebSocket | https://fastapi.tiangolo.com/advanced/ | Background job triggering, auth middleware | Background job triggering, RBAC |
| **Pydantic v2 Docs** | Data validation and serialization | https://docs.pydantic.dev/latest/ | All request/response schemas | API schema definitions |
| **pydantic-settings** | Settings management from env vars | https://docs.pydantic.dev/latest/concepts/pydantic_settings/ | Configuration management | config.py |
| **ARQ Documentation** | Async Redis Queue | https://arq-docs.helpmanual.io | Background worker setup | All background jobs |
| **httpx** | Async HTTP client for tests and adapters | https://www.python-httpx.org | Testing API endpoints; making HTTP calls in adapters | Integration tests, adapter HTTP calls |

---

## 11. Next.js Documentation

### ✅ VERIFIED/OFFICIAL

| Name | Purpose | URL | Why it matters | SANKHYA AI Usage |
|---|---|---|---|---|
| **Next.js App Router Docs** | App Router, layouts, server components | https://nextjs.org/docs/app | Primary frontend development reference | Entire frontend architecture |
| **Next.js Authentication** | Auth patterns with App Router | https://nextjs.org/docs/app/building-your-application/authentication | JWT + cookie handling in Next.js | Auth flow |
| **shadcn/ui Documentation** | Component installation and usage | https://ui.shadcn.com | Component implementation reference | All UI components |
| **Recharts Documentation** | Chart components | https://recharts.org/en-US/api | RadarChart, BarChart, LineChart implementation | Skill DNA, gap bars, heatmap |
| **TanStack Query (React Query)** | Server state management | https://tanstack.com/query/latest | Data fetching, caching, refetching strategy | All API calls from frontend |
| **Tailwind CSS Docs** | Utility class reference | https://tailwindcss.com/docs | Styling reference | All styling |

---

## 12. Security Standards & Guidelines

### ✅ VERIFIED/OFFICIAL

| Name | Purpose | URL | Why it matters | SANKHYA AI Usage |
|---|---|---|---|---|
| **OWASP Top 10** | Web application security risks | https://owasp.org/www-project-top-ten/ | Checklist for security controls | Security architecture validation |
| **OWASP API Security Top 10** | API-specific security risks | https://owasp.org/www-project-api-security/ | API security checklist (broken auth, injection, rate limiting) | API security implementation |
| **NIST Cybersecurity Framework** | Government-aligned security framework | https://www.nist.gov/cyberframework | Security posture alignment for government platform | Security architecture |
| **JWT Best Practices (RFC 8725)** | Secure JWT implementation | https://www.rfc-editor.org/rfc/rfc8725 | RS256 signing, expiry, scope — implementation correctness | JWT auth implementation |
| **MEITY Data Protection Guidelines** | India data protection principles | https://www.meity.gov.in | Data localization, privacy compliance for Indian government data | Privacy controls design |

### 📚 RESEARCH

| Name | Purpose | URL | Why it matters | SANKHYA AI Usage |
|---|---|---|---|---|
| **DPDP Act 2023 (Digital Personal Data Protection)** | India's data protection law | https://www.meity.gov.in/data-protection-framework | Governs personal data handling in Indian platforms | Privacy architecture decisions |

---

## 13. API Integration Resources

### ⚠️ PROTOTYPE/MOCK

| Name | Purpose | Status | SANKHYA AI Usage |
|---|---|---|---|
| **iGOT Course Search API** | Fetch courses by competency | Not publicly documented. Requires official iGOT API registration. | Mock adapter implements same interface. Ready for live implementation when credentials available. |
| **iGOT Enrollment API** | Check/initiate course enrollment | Not publicly documented. | Same mock adapter handles enrollment status. |
| **NSSTA TPAC Catalogue API** | Fetch TPAC training programmes | Not publicly documented. | Mock adapter with seeded TPAC-style data. |

### ✅ VERIFIED/OFFICIAL

| Name | Purpose | URL | Why it matters | SANKHYA AI Usage |
|---|---|---|---|---|
| **OpenAPI 3.1 Specification** | Standard for API contract documentation | https://spec.openapis.org/oas/v3.1.0 | Auto-generated by FastAPI — judges can explore all endpoints | API documentation |

---

## 14. Dataset Resources

### ✅ VERIFIED/OFFICIAL (for competency framework seeding)

| Name | Purpose | URL | Why it matters | SANKHYA AI Usage |
|---|---|---|---|---|
| **data.gov.in** | India's open government data portal | https://data.gov.in | Open datasets for statistical domain context | Competency context; potential demo data source |
| **MoSPI Press Releases** | Statistical publications by MoSPI | https://mospi.gov.in/press-note | Real statistical topics for competency taxonomy | Competency framework content |
| **UN Statistics Division Publications** | International statistical standards | https://unstats.un.org/unsd/publication/ | Official statistics competency reference material | RAG ingestion for AI Tutor training content |

### ⚠️ PROTOTYPE/MOCK

| Name | Purpose | Status | SANKHYA AI Usage |
|---|---|---|---|
| **Workforce Competency Dataset** | Historical competency scores for forecasting model | Does not exist publicly. Would require MoSPI institutional data sharing agreement. | Forecasting engine uses rule-based estimates, clearly marked as prototype data. |
| **iGOT Course Completion Statistics** | Training effectiveness measurement | Not publicly available. | Analytics engine uses synthetic historical data, clearly marked. |

---

## 15. Research Papers

### 📚 RESEARCH

| Name | Purpose | URL | Why it matters | SANKHYA AI Usage |
|---|---|---|---|---|
| **"Attention is All You Need" (Vaswani et al., 2017)** | Transformer architecture — foundation of all LLMs used | https://arxiv.org/abs/1706.03762 | Theoretical foundation | Background knowledge |
| **"Dense Passage Retrieval" (Karpukhin et al., 2020)** | DPR approach to embedding-based retrieval | https://arxiv.org/abs/2004.04906 | Informed our embedding-based chunk retrieval design | RAG retrieval approach |
| **"RAG for Knowledge-Intensive NLP" (Lewis et al., 2020)** | Original RAG paper | https://arxiv.org/abs/2005.11401 | Core RAG design | AI Tutor architecture |
| **"A Three-Parameter Logistic Model" (Birnbaum, 1968)** | IRT model for adaptive testing | Available in psychometrics texts | Foundation for advanced adaptive assessment (roadmap) | Adaptive assessment roadmap |
| **"Competency-Based Training in Statistics" — various UN Statistics Division** | Statistical competency development research | https://unstats.un.org/capacity-development/resources/ | Domain-specific competency measurement | Competency framework design |

---

## 16. Useful Open-Source Libraries

### ✅ VERIFIED/OFFICIAL

**Python (Backend + AI)**

| Library | Version | Purpose | SANKHYA AI Usage |
|---|---|---|---|
| `fastapi` | 0.111+ | Web framework | API layer |
| `pydantic` | 2+ | Data validation | All schemas |
| `sqlalchemy[asyncio]` | 2+ | ORM | Database layer |
| `asyncpg` | 0.29+ | PostgreSQL async driver | DB performance |
| `alembic` | Latest | DB migrations | Schema management |
| `arq` | Latest | Background jobs | All workers |
| `redis` | Latest | Redis client | Cache + queue |
| `pgvector` | Latest | pgvector Python types | Embedding storage |
| `sentence-transformers` | Latest | Embedding models | Local embedding |
| `PyMuPDF` (fitz) | Latest | PDF parsing | Document ingestion |
| `python-docx` | Latest | DOCX parsing | Document ingestion |
| `python-pptx` | Latest | PPTX parsing | Document ingestion |
| `passlib[bcrypt]` | Latest | Password hashing | Auth security |
| `python-jose` | Latest | JWT handling | Token generation |
| `structlog` | Latest | Structured logging | Observability |
| `httpx` | Latest | Async HTTP client | Adapter HTTP calls, tests |
| `pytest` | Latest | Testing framework | All tests |
| `pytest-asyncio` | Latest | Async test support | FastAPI tests |
| `google-generativeai` | Latest | Gemini API SDK | LLM provider |
| `openai` | Latest | OpenAI fallback SDK | LLM fallback |

**JavaScript/TypeScript (Frontend)**

| Library | Purpose | SANKHYA AI Usage |
|---|---|---|
| `next` | Frontend framework | Entire web app |
| `react` | UI library | Components |
| `typescript` | Type safety | All frontend code |
| `tailwindcss` | Styling | All styling |
| `@radix-ui/*` | Accessible primitives (via shadcn) | UI components |
| `recharts` | Data visualization | Skill DNA, analytics charts |
| `@tanstack/react-query` | Server state | API data fetching |
| `react-hook-form` | Form handling | Registration, profile, assessment |
| `zod` | Schema validation | Form + API response validation |
| `framer-motion` | Animations | Skill DNA reveal, transitions |
| `lucide-react` | Icons | UI icons |
| `date-fns` | Date formatting | Learning path dates |
| `vitest` | Frontend testing | Component tests |

---

## 17. UI/UX Inspiration

### 🔧 OPTIONAL

| Name | Purpose | URL | Applies to |
|---|---|---|---|
| **Linear.app** | Clean information density, status indicators | https://linear.app | Admin workforce dashboard design |
| **Notion** | Document-style layout, sidebar navigation | https://notion.so | Trainer document management UI |
| **Duolingo** | Skill progress visualization, gamification patterns | https://duolingo.com | Learner progress indicators |
| **Figma Community — Government Design Systems** | Accessible government UI patterns | https://www.figma.com/community | Overall UI tone |
| **India.gov.in** | Official Indian government web aesthetic | https://www.india.gov.in | Color palette and typography reference |
| **NIC Design System** | Government-standard web components | https://designsystem.india.gov.in (if available) | UI consistency with government platforms |
| **Retool (public templates)** | Admin dashboard patterns | https://retool.com/templates | Admin workforce analytics layout |

---

## 18. Testing Tools

### ✅ VERIFIED/OFFICIAL

| Name | Purpose | URL | SANKHYA AI Usage |
|---|---|---|---|
| **pytest** | Python testing framework | https://pytest.org | Backend unit + integration tests |
| **pytest-asyncio** | Async test support | https://pytest-asyncio.readthedocs.io | FastAPI async endpoint tests |
| **httpx** | Async HTTP client for API tests | https://www.python-httpx.org | Integration tests against live FastAPI |
| **Vitest** | Fast frontend unit testing | https://vitest.dev | React component tests |
| **React Testing Library** | Component interaction testing | https://testing-library.com/react | Assessment UI, chat UI tests |
| **Playwright** | End-to-end browser testing | https://playwright.dev | Full learner flow E2E (optional for hackathon) |
| **factory_boy** | Test fixture factories | https://factoryboy.readthedocs.io | Seeded test data generation |

---

## 19. Deployment Resources

### ✅ VERIFIED/OFFICIAL

| Name | Purpose | URL | SANKHYA AI Usage |
|---|---|---|---|
| **Docker Documentation** | Container building and Compose | https://docs.docker.com | Hackathon deployment |
| **pgvector Docker Image** | Official pgvector PostgreSQL image | https://hub.docker.com/r/pgvector/pgvector | `pgvector/pgvector:pg16` in docker-compose |
| **Google Cloud Run** | Serverless container deployment | https://cloud.google.com/run | Production API and worker deployment |
| **Vercel Documentation** | Next.js deployment platform | https://vercel.com/docs | Frontend production deployment |
| **Cloud SQL for PostgreSQL** | Managed PostgreSQL with pgvector | https://cloud.google.com/sql/docs/postgres | Production database |
| **Google Memorystore** | Managed Redis | https://cloud.google.com/memorystore | Production Redis |
| **GitHub Actions** | CI/CD pipeline | https://docs.github.com/actions | Automated tests + deployment |

### 🔧 OPTIONAL

| Name | Purpose | URL | SANKHYA AI Usage |
|---|---|---|---|
| **Prometheus** | Metrics collection | https://prometheus.io | Production application monitoring |
| **Grafana** | Metrics visualization | https://grafana.com | Production dashboards |
| **Sentry** | Error tracking | https://sentry.io | Production error alerting |
| **Nginx** | Reverse proxy | https://nginx.org | TLS termination, load balancing |

---

*See also: [01-TECHNICAL-DETAILS.md](./01-TECHNICAL-DETAILS.md) · [02-TECH-STACK-AND-WHY.md](./02-TECH-STACK-AND-WHY.md) · [04-END-TO-END-WORKFLOW.md](./04-END-TO-END-WORKFLOW.md)*
