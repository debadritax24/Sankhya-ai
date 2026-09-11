# SANKHYA AI — Engineering Constitution

> **SIH 2026 | Problem Statement 26101**
> AI-enabled Skill Intelligence and Learning Platform for India's Official Statistical System

---

## Project Purpose

Build a production-quality frontend prototype for an AI-powered skill intelligence platform that helps Indian government officials identify competency gaps and access personalized learning recommendations. The platform must look and feel like an official Government of India digital service.

---

## Frontend Architecture

- **Framework:** Next.js 16+ (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui primitives
- **Charts:** Recharts
- **Animation:** Framer Motion
- **Smooth Scroll:** Lenis
- **Authentication:** Clerk
- **State:** Server Components by default; Client Components only when necessary

---

## Coding Standards

### TypeScript
- Use strict TypeScript — no `any` types
- Define interfaces for all API responses
- Use discriminated unions for state management
- Prefer `interface` over `type` for object shapes

### React
- Prefer Server Components for data fetching and static content
- Use Client Components (`"use client"`) only for:
  - User interactions (forms, buttons)
  - Animations (Framer Motion)
  - Browser APIs (Lenis, localStorage)
  - Clerk interactive components
  - Charts (Recharts)
- Keep components small and focused
- One component per file
- Use descriptive component names

### Files
- Use kebab-case for file names: `competency-card.tsx`
- Use PascalCase for component names: `CompetencyCard`
- Group related files together
- Avoid deep nesting (max 4 levels)

---

## UI/UX Principles

### Government Digital Service Aesthetic
The UI must communicate:
- **TRUST** — Official, reliable, secure
- **AUTHORITY** — Professional, credible, institutional
- **CLARITY** — Clear hierarchy, readable, accessible
- **PUBLIC SERVICE** — For citizens, not customers

### What This Means Visually
- White / near-white primary background
- Government navy/deep blue as primary color
- Indian saffron as accent (sparingly)
- Green for positive/status indicators
- Neutral grays for structure
- Dark charcoal for text
- Professional sans-serif typography
- Structured information hierarchy
- Official-style header and footer

### What to Avoid
- Dark SaaS dashboards
- Neon colors or gradients
- Glassmorphism everywhere
- Excessive rounded cards
- Startup marketing sections
- Gaming UI patterns
- Excessive animations
- AI-generated visuals
- Overly large typography

---

## Folder Conventions

```
src/
├── app/
│   ├── (public)/          # Public routes (landing, about)
│   ├── (auth)/            # Authentication routes (sign-in, sign-up)
│   ├── dashboard/         # Authenticated learner dashboard
│   ├── competency/        # Skill DNA, competency profile
│   ├── learning/          # Learning paths, courses
│   ├── assessments/       # Assessments, quizzes
│   ├── ai-tutor/          # AI Learning Copilot
│   ├── admin/             # Admin dashboard, workforce analytics
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
│
├── components/
│   ├── ui/                # shadcn/ui primitives
│   ├── layout/            # Header, Footer, Sidebar
│   ├── navigation/        # Nav components
│   ├── dashboard/         # Dashboard widgets
│   ├── competency/        # Skill DNA visualization
│   ├── learning/          # Course cards, learning paths
│   ├── assessment/        # Question renderer, quiz UI
│   ├── tutor/             # AI copilot chat interface
│   └── admin/             # Admin-specific components
│
├── lib/
│   ├── auth/              # Clerk helpers
│   ├── utils/             # Utility functions
│   ├── validations/       # Zod schemas
│   └── constants/         # Static data, config
│
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
├── config/                # App configuration
└── styles/                # Global styles
```

---

## Component Conventions

### shadcn/ui Components
- Use shadcn/ui primitives as the base
- Extend with project-specific styling
- Maintain accessibility (ARIA attributes)
- Document any modifications

### Custom Components
- Accept `className` prop for composition
- Use `forwardRef` when forwarding refs
- Export types alongside components
- Provide sensible defaults

### State Management
- Use `useState` for local component state
- Use URL state for filterable/sortable lists
- Avoid prop drilling — use composition
- Server state via API routes (no client-side cache library needed yet)

---

## Accessibility Requirements

Accessibility is a core requirement, not optional.

- Keyboard navigation for all interactive elements
- Visible focus states (ring-2 ring-offset-2)
- Semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`)
- ARIA labels where semantic HTML is insufficient
- Minimum contrast ratio: 4.5:1 (text), 3:1 (large text)
- Alt text for all meaningful images
- Form labels and error messages
- Skip navigation link
- Reduced motion support (`prefers-reduced-motion`)
- Screen reader testing considerations

---

## Responsive Design Rules

The application must work on: Mobile, Tablet, Laptop, Desktop.

- Mobile-first approach (design for 320px, enhance upward)
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px)
- Navigation: hamburger menu on mobile, full nav on desktop
- Tables: horizontal scroll or card layout on mobile
- Dashboards: stack vertically on mobile
- Touch targets: minimum 44px × 44px on mobile
- Test at all breakpoints before completing a task

---

## Animation Rules

### Framer Motion
- Use for page transitions (subtle fade + slide)
- Use for section reveals (fade in on scroll)
- Use for progress animations (count up)
- Use for modal transitions (scale + fade)
- Use for navigation transitions

### Lenis
- Smooth scrolling on main content areas
- Respect `prefers-reduced-motion`
- Do not make scrolling feel artificial
- Performance: use `requestAnimationFrame`

### What to Avoid
- Excessive bouncing or spring animations
- Large parallax effects
- Constant movement on elements
- Animation on every element
- Animation for decoration only

Animation should communicate state or hierarchy.

---

## Authentication Rules

### Clerk Integration
- Use Clerk's official Next.js integration
- Protected routes via middleware
- User profile from Clerk
- Session management handled by Clerk

### Route Protection
- Public routes: `/`, `/about`, `/api/public/*`
- Protected routes: `/dashboard/*`, `/competency/*`, `/learning/*`, `/assessments/*`, `/ai-tutor/*`
- Admin routes: `/admin/*` (role-based)

### Role Architecture
Prepare for roles (not complex RBAC yet):
- `LEARNER` — Default role
- `TRAINER` — Can manage content and assessments
- `ADMIN` — Can view all analytics
- `SUPER_ADMIN` — Full access

---

## Environment Variable Rules

### CRITICAL
- NEVER create `.env.example`, `.env.local`, `.env.development`, `.env.production`
- ONLY use `.env`
- Document variable names in code/comments
- Never commit secrets

### Required Variables
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_API_URL=
```

---

## Security Rules

- Never hard-code credentials or API keys
- Use environment variables for secrets
- Validate all user inputs on the client AND server
- Use CSRF protection for forms
- Implement proper session management
- Follow Clerk security best practices
- No sensitive data in URL parameters
- Sanitize any user-generated content before display

---

## Performance Rules

- Use Server Components by default
- Use dynamic imports for heavy components (charts, modals)
- Optimize images with `next/image`
- Lazy load below-the-fold content
- Minimize client-side JavaScript
- Use `React.memo` for expensive renders
- Avoid unnecessary re-renders
- Use `loading.tsx` for route-level loading states
- Use `error.tsx` for error boundaries

---

## Testing Expectations

- TypeScript compilation: no errors
- ESLint: no warnings or errors
- Build: successful production build
- Responsive: test at mobile/tablet/desktop
- Accessibility: keyboard navigation, focus states
- Visual: no layout shifts, proper spacing

---

## Git/Change Discipline

- One logical change per commit
- Descriptive commit messages
- No formatting-only changes mixed with logic changes
- Update MEMORY.md after every significant change
- Document decisions in MEMORY.md

---

## Rules for Future AI Coding Agents

1. **READ FIRST:** Before any task, read `AGENTS.md`, `SKILL.md`, and `MEMORY.md`
2. **RESPECT DESIGN:** Follow the government digital service aesthetic strictly
3. **DO NOT OVERWRITE:** If files exist, inspect before modifying
4. **VERIFY:** Run typecheck and lint after every change
5. **UPDATE MEMORY:** Record all decisions and changes in MEMORY.md
6. **PRESERVE:** Never break existing working functionality
7. **MINIMIZE:** Do not add unnecessary dependencies
8. **DOCUMENT:** If you make a decision, record it in MEMORY.md

---

*Last updated: 2026-09-10*

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
