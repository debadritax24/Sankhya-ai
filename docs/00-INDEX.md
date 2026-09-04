# SANKHYA AI — Documentation Index

> **SIH 2026 | Problem Statement 26101**
> **Platform:** AI-powered Skill Intelligence & Personalized Learning Platform for India's Official Statistical System

---

## Documentation Files

| File | Title | Purpose |
|---|---|---|
| [01-TECHNICAL-DETAILS.md](./01-TECHNICAL-DETAILS.md) | Technical Architecture & Engineering Reference | Complete system architecture, all AI components, algorithms, formulas, Mermaid diagrams, MVP vs roadmap |
| [02-TECH-STACK-AND-WHY.md](./02-TECH-STACK-AND-WHY.md) | Technology Stack & Decision Record | Every technology justified: what, why, alternatives considered and rejected |
| [03-RESOURCES.md](./03-RESOURCES.md) | Research & Implementation Resources | Organized resource list — official government, AI/ML, frameworks, datasets, research papers |
| [04-END-TO-END-WORKFLOW.md](./04-END-TO-END-WORKFLOW.md) | End-to-End System Workflow | 32-step implementation workflow with actor, trigger, API, AI logic, DB ops, errors per step |

Legacy reference: [../tech.md](../tech.md) — Original technical approach document (preserved, superseded by docs/ above)

---

## Terminology Reference

| Term | Definition |
|---|---|
| **Skill DNA** | Complete visual + data competency fingerprint for an official across all domains |
| **Competency Intelligence Engine** | Core AI module that builds evidence-based competency profiles from multiple signals |
| **Multi-signal Scoring** | Weighted formula combining diagnostic, practical, experience, training, profile, and recent learning signals |
| **Gap Engine** | Priority-scoring engine that ranks competency gaps by role importance + future demand + career relevance |
| **Next Best Skill** | Single highest-priority skill intervention derived from gap engine — not arbitrary LLM output |
| **Hybrid Recommendation** | Filter → semantic search → deterministic ranking → LLM explanation (LLM explains, does not decide) |
| **iGOT Adapter** | API contract layer for iGOT Karmayogi courses — prototype/mock in hackathon; live-ready architecture |
| **TPAC Adapter** | Same adapter pattern for NSSTA/TPAC training programmes |
| **RAG** | Retrieval-Augmented Generation — AI answers grounded in approved source documents |
| **Assessment Quality Guard** | 7-stage pipeline preventing raw LLM output from reaching learners |
| **Adaptive Assessment** | Assessment that adjusts question difficulty based on learner performance |
| **Career Readiness** | Score measuring how close a learner is to meeting target role requirements |
| **Workforce Simulator** | Admin tool for "what if" capability requirement scenarios |
| **Prototype Data** | Seeded/simulated data used in demo — always flagged `is_prototype_data: true` in API |

---

## Contradictions & Gaps Found in Existing tech.md

The original `tech.md` is well-written and internally consistent. The new documentation set addresses these gaps:

| Gap | Resolution |
|---|---|
| No Mermaid diagrams | Added throughout docs/01 and docs/04 |
| No per-step API endpoint mapping | docs/04 maps every workflow step to specific API endpoint |
| No failure handling per component | docs/01 §32, docs/04 every step has Error Cases |
| No explicit prototype/mock labeling system | docs/01 §18-19, docs/04 steps 11-13 document `is_mock: true` flag pattern |
| No technology justification document | docs/02 covers every technology with alternatives considered |
| No resource/reference list | docs/03 organized by category with VERIFIED/PROTOTYPE labels |
| Multilingual architecture mentioned but not detailed | Consistent: marked roadmap/Phase 2, not MVP |
| Workers mentioned but job types not fully specified | docs/01 §24 and docs/04 steps 19-20 fully specify all worker jobs |
| No complete API route map | docs/01 §25 provides complete route listing |
| Demo data strategy described but data schema not specified | docs/01 §22 specifies heatmap JSON shape with `is_prototype_data` flag |

---

## Highest-Risk Technical Components

| Risk | Component | Mitigation |
|---|---|---|
| 🔴 **Critical** | iGOT/TPAC live API access — not available | Adapter pattern with mock data; honest labeling; architecture is live-ready |
| 🔴 **Critical** | LLM provider reliability during demo | Ollama local LLM fallback; cached AI outputs; retry logic |
| 🟠 **High** | Document RAG pipeline latency (PDF → embed → query) | Background jobs; status polling; pre-process demo documents before demo |
| 🟠 **High** | Multi-signal scoring formula correctness | Unit tests for formula; deterministic seed data produces expected outputs |
| 🟠 **High** | Quality guard rejecting all questions | Tune thresholds; pre-generate and approve demo question bank before demo |
| 🟡 **Medium** | pgvector IVFFlat index performance at scale | Acceptable at hackathon scale; document scale limits |
| 🟡 **Medium** | Adaptive assessment fairness | Document it as simplified model; IRT flagged as roadmap |
| 🟡 **Medium** | Competency graph circular dependency | Detect and break cycles during seed data creation |
| 🟢 **Low** | Frontend rendering performance | Next.js SSR + React Query caching handles this |
| 🟢 **Low** | Authentication security | Standard JWT/bcrypt; well-tested pattern |

---

## Recommended Implementation Order

### Phase 1 — Foundation (Days 1-2)
1. Docker Compose setup (postgres + pgvector + redis)
2. FastAPI skeleton with auth endpoints
3. User, department, job_role, competency DB schema + Alembic migrations
4. Seed competency framework (30-50 competencies, 4 domains)
5. Next.js skeleton with auth pages and role-based routing

### Phase 2 — Competency Core (Days 3-4)
6. Multi-signal scoring service + competency analyze endpoint
7. `user_competencies` upsert logic
8. Gap engine + priority classification
9. Skill DNA API endpoint
10. Skill DNA visualization UI (radar + bar charts)

### Phase 3 — Recommendations (Day 5)
11. Course model + course_competencies + seed iGOT/TPAC mock data
12. Recommendation ranking formula
13. Course embedding generation (worker job)
14. Recommendations API + UI
15. Learning path generator (topological sort)

### Phase 4 — Assessment AI (Days 6-7)
16. Document upload endpoint + object storage
17. Document processing worker (PyMuPDF + chunking + embedding)
18. MCQ generation worker (LLM + quality guard)
19. Question bank + trainer review UI
20. Adaptive assessment engine + learner UI

### Phase 5 — AI Tutor + Career (Day 8)
21. RAG retrieval service
22. Copilot chat endpoint + intent classifier
23. Chat UI with streaming + citations
24. Career readiness score + career path UI

### Phase 6 — Admin + Workforce (Day 9)
25. Admin workforce dashboard + heatmap
26. Future skill forecasting (rule-based)
27. Workforce simulator
28. Audit logging throughout

### Phase 7 — Demo Hardening (Day 10)
29. Full seed data (officials, courses, documents, assessments)
30. Pre-generate and approve question banks for demo documents
31. Loading/error/empty states on all pages
32. End-to-end demo run: identify and fix any gaps
33. Docker Compose final test: `docker compose up` → full demo in 2 minutes

---

## What Judges Should See in the Demo

**Scene 1: The Problem (30 seconds)**
> "An official in India's Labour Statistics department has access to hundreds of iGOT courses — but no way to know which matter, which are missing, or what skills their organization needs in the next 3 years. SANKHYA AI solves this."

**Scene 2: Skill DNA (45 seconds)**
- Show a pre-onboarded Statistical Officer profile
- Click "AI Skill Scan" → radar chart animates
- Point out: current (blue) vs required (orange) vs future (red) on each axis
- Highlight: "AI/ML — Critical Gap. 24% current, 60% required, 82% future demand"

**Scene 3: Next Best Skill (30 seconds)**
- Show Next Best Skill card: "SQL — 27 point gap"
- Click "Why" → explanation: role requirement + prerequisite for 3 other competencies + high future demand
- Click "Generate Learning Path" → sequenced 6-course path appears

**Scene 4: iGOT + TPAC Recommendations (30 seconds)**
- Show unified recommendation list with provider badges (iGOT / TPAC / Internal)
- ⚠️ Point out prototype badge — "Our adapter is live-ready; awaiting official API access"
- Show one recommendation explanation: "Recommended because your SQL score is below role requirement..."

**Scene 5: AI Assessment Studio (60 seconds)**
- Switch to Trainer view
- Upload `sampling_methodology.pdf`
- Click "Generate Quiz" → 10 questions appear with source page citations
- Click Approve on 2-3 questions
- Show a question: text, 4 options, correct answer, "Source: Sampling Methods Manual, p.18"

**Scene 6: AI Tutor (30 seconds)**
- Learner view: open Copilot
- Ask: "Why did I get the sampling frame question wrong?"
- Show answer with citation: "Source: Sampling Guide, p.23"

**Scene 7: Workforce Simulator (45 seconds)**
- Switch to Admin view
- Show heatmap: Labour (AI/ML: 39%), Agriculture (AI/ML: 31%)
- Open Workforce Simulator
- Set "AI/ML: 75% required for all roles"
- Click Run → "67 officials below threshold. Estimated: 804 training hours. Projected readiness: 71% → 85%"

**Scene 8: Close the Loop (20 seconds)**
> "SANKHYA AI is not a course catalogue. It is a continuous competency-to-workforce intelligence loop — from individual skill scan to national workforce readiness."

**Total demo time: ~5 minutes**

---

## Consistent Terminology Checklist

When writing code, UI copy, or speaking during the demo, use these terms consistently:

- ✅ **Skill DNA** (not "skill profile" or "competency snapshot")
- ✅ **Next Best Skill** (not "recommended skill" or "top gap")
- ✅ **Competency Intelligence Engine** (not "AI scoring module")
- ✅ **Assessment Quality Guard** (not "quality checker")
- ✅ **AI Learning Copilot** (not "chatbot" or "AI assistant")
- ✅ **Prototype data** / **Simulated data** (for any mock/seeded content — never omit this)
- ✅ **Adapter-ready** or **API-ready** (for iGOT/TPAC — not "integrated" or "connected")
- ✅ **Career Readiness** (not "career match" or "role fit")
- ✅ **Workforce Simulator** (not "planning tool")

---

*Documentation created: 2026-09-04 | SANKHYA AI Team | SIH 2026*
