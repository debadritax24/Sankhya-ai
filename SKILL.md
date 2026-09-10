# SANKHYA AI — Technical Skills Reference

> **SIH 2026 | Problem Statement 26101**
> Skills required to build the AI-enabled Skill Intelligence Platform

---

## Frontend Skills

### Core Stack
| Skill | Usage | Proficiency Required |
|-------|-------|---------------------|
| **Next.js 16+** | App Router, Server Components, layouts, routing | Advanced |
| **React 19** | Component architecture, hooks, Server/Client Components | Advanced |
| **TypeScript** | Strict typing, interfaces, discriminated unions | Advanced |
| **Tailwind CSS v4** | Utility-first styling, responsive design, custom config | Advanced |

### UI & Components
| Skill | Usage | Proficiency Required |
|-------|-------|---------------------|
| **shadcn/ui** | Accessible primitives (Button, Card, Modal, Form, Table) | Advanced |
| **Framer Motion** | Page transitions, section reveals, progress animations | Intermediate |
| **Recharts** | Radar charts, bar charts, heatmaps, line charts | Intermediate |
| **Lenis** | Smooth scrolling with reduced-motion support | Basic |

### Architecture
| Skill | Usage | Proficiency Required |
|-------|-------|---------------------|
| **Server Components** | Data fetching, static content, reduced client JS | Advanced |
| **Client Components** | Interactions, animations, browser APIs | Advanced |
| **App Router** | Route groups, layouts, loading/error states | Advanced |
| **API Routes** | Backend-for-frontend pattern, webhook handling | Intermediate |

---

## Authentication Skills

| Skill | Usage | Proficiency Required |
|-------|-------|---------------------|
| **Clerk** | Sign up, sign in, sign out, user profile, session | Intermediate |
| **Clerk Middleware** | Route protection, role-based access | Intermediate |
| **Clerk React Hooks** | `useUser`, `useAuth`, `useSignIn` | Intermediate |

---

## Engineering Skills

### Code Quality
| Skill | Usage |
|-------|-------|
| **TypeScript strict mode** | No `any` types, proper interfaces |
| **ESLint** | Code linting, consistent style |
| **Prettier** | Code formatting (via ESLint config) |

### Forms & Validation
| Skill | Usage |
|-------|-------|
| **React Hook Form** | Form state management, validation |
| **Zod** | Schema validation, TypeScript integration |

### State Management
| Skill | Usage |
|-------|-------|
| **Server state** | API routes, no client cache library |
| **URL state** | Filters, pagination, sorting via search params |
| **Local state** | `useState`, `useReducer` for component state |

### Performance
| Skill | Usage |
|-------|-------|
| **Dynamic imports** | `next/dynamic` for heavy components |
| **Image optimization** | `next/image` with proper sizing |
| **Code splitting** | Automatic with App Router |
| **Lazy loading** | Below-the-fold content |

---

## UI Skills

### Information Architecture
| Skill | Usage |
|-------|-------|
| **Government-grade layouts** | Structured, hierarchical, official |
| **Dashboard design** | Data-heavy, not startup-style |
| **Navigation patterns** | Breadcrumbs, service nav, user menu |
| **Search & filter** | Command interface, filters, sorting |

### Component Patterns
| Skill | Usage |
|-------|-------|
| **StatCard** | Key metrics with labels |
| **SectionHeader** | Page/section titles with actions |
| **DataTable** | Sortable, filterable, paginated tables |
| **EmptyState** | When no data is available |
| **LoadingState** | Skeleton screens, spinners |
| **Alert** | Success, warning, error messages |
| **Badge** | Status indicators, tags |
| **Tabs** | Content switching |
| **Modal** | Dialogs, confirmations |
| **Dropdown** | Action menus, select inputs |
| **Tooltip** | Contextual information |
| **Breadcrumb** | Navigation hierarchy |
| **Avatar** | User representation |
| **Progress** | Task/course completion |

### Visualization
| Skill | Usage |
|-------|-------|
| **Radar charts** | Skill DNA, competency overview |
| **Bar charts** | Gap comparison, progress |
| **Heatmaps** | Department competency matrix |
| **Line charts** | Learning progress over time |
| **Progress bars** | Individual skill progress |
| **Gauges** | Career readiness score |

---

## Accessibility Skills

| Skill | Usage |
|-------|-------|
| **WCAG 2.1 AA** | Minimum compliance level |
| **Keyboard navigation** | Tab order, focus management |
| **Screen readers** | ARIA labels, roles, live regions |
| **Color contrast** | 4.5:1 minimum for text |
| **Focus indicators** | Visible ring on interactive elements |
| **Reduced motion** | `prefers-reduced-motion` media query |
| **Semantic HTML** | Proper heading hierarchy, landmarks |

---

## Responsive Design Skills

| Skill | Usage |
|-------|-------|
| **Mobile-first** | Design for 320px, enhance upward |
| **Tailwind breakpoints** | `sm`, `md`, `lg`, `xl`, `2xl` |
| **Responsive navigation** | Hamburger menu, collapsible sidebar |
| **Responsive tables** | Card layout or horizontal scroll on mobile |
| **Touch targets** | Minimum 44px × 44px |

---

## Performance Skills

| Skill | Usage |
|-------|-------|
| **Server Components** | Default for data fetching |
| **Dynamic imports** | Charts, modals, heavy components |
| **Image optimization** | WebP, proper sizing, lazy loading |
| **Font optimization** | `next/font` for system fonts |
| **Bundle analysis** | Identify large dependencies |

---

## Security Skills

| Skill | Usage |
|-------|-------|
| **Input validation** | Client + server validation |
| **CSRF protection** | Form tokens |
| **XSS prevention** | Sanitize user content |
| **Authentication** | Clerk session management |
| **Authorization** | Role-based route protection |

---

## Domain-Specific Skills

| Skill | Usage |
|-------|-------|
| **Government UI patterns** | Official-looking header, footer, navigation |
| **Data-heavy dashboards** | Multiple metrics, charts, tables |
| **Competency visualization** | Radar, bars, gaps, priorities |
| **Learning path visualization** | Sequential courses, progress tracking |
| **Assessment UI** | MCQ rendering, timer, submission |
| **AI copilot interface** | Chat UI with citations |
| **Admin analytics** | Workforce heatmaps, forecasting |

---

*Last updated: 2026-09-10*
