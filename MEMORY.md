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

### Immediate (Next Tasks)
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
| No Clerk middleware | Not yet configured | Routes not protected |
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

*Last updated: 2026-09-11*
