# Roadmap 09-02-2026: React → Next.js Migration

> **Start Time:** 22:15 +07:00
> **Status:** ✅ Restored to stable (`fb4b804`)
> **Total Duration:** ~3h 30m

---

## 📊 Progress Overview

| Phase                           | Status  | Started | Completed | Duration |
| ------------------------------- | ------- | ------- | --------- | -------- |
| Phase 1: Setup & Scaffolding    | ✅ Done | 22:15   | 23:00     | 45m      |
| Phase 2: Pages Migration        | ✅ Done | 23:00   | 23:15     | 15m      |
| Phase 3: Components Migration   | ✅ Done | 23:15   | 23:30     | 15m      |
| Phase 4: Data Fetching          | ✅ Done | 23:30   | 00:30     | 60m      |
| Phase 5: Testing & Verification | ✅ Done | 00:30   | 00:45     | 15m      |
| **TOTAL**                       | -       | 22:15   | 00:45     | 2h 30m   |

---

## Phase 1: Setup & Scaffolding

**Goal:** Create Next.js app alongside existing React app, setup infrastructure

- [x] **1.1** Create `apps/web-next` with `create-next-app` (Used existing `apps/web`)
  - Next.js 16 (App Router)
  - TypeScript, Tailwind, ESLint
  - → Verify: `bun run dev` starts successfully
- [x] **1.2** Copy shared configs (tailwind, tsconfig)
  - → Verify: Theme colors match current app
- [x] **1.3** Setup Supabase integration
  - → Verify: Dependencies installed, `@supabase/ssr` added
- [x] **1.4** Copy `components/ui` (shadcn components)
  - → Verify: No TypeScript errors (Fixed React 19 type issues)

---

## Phase 2: Pages Migration

**Goal:** Convert React Router pages to Next.js App Router

| React Route                           | Next.js Route                                       | Status |
| ------------------------------------- | --------------------------------------------------- | ------ |
| `/` (Index)                           | `app/page.tsx`                                      | ✅     |
| `/comic/:slug`                        | `app/comic/[slug]/page.tsx`                         | ✅     |
| `/comic/:slug/episode/:episodeNumber` | `app/comic/[slug]/episode/[episodeNumber]/page.tsx` | ✅     |
| `*` (NotFound)                        | `app/not-found.tsx`                                 | ✅     |
| (Test)                                | `app/test-connection/page.tsx`                      | ✅     |

- [x] **2.1** Create root layout with providers
- [x] **2.2** Migrate Index page (Server Component structure)
- [x] **2.3** Migrate ComicDetail page (Server + Client structure)
- [x] **2.4** Migrate EpisodeViewer page
- [x] **2.5** Create not-found.tsx

---

## Phase 3: Components Migration

**Goal:** Move components with Server/Client boundary decisions

| Component       | Server/Client | Notes                    |
| --------------- | ------------- | ------------------------ |
| Header          | Client        | Navigation, interactions |
| Footer          | Server        | Static content           |
| ComicCard       | Server        | Display only             |
| CategorySection | Server        | Display only             |
| DailySchedule   | Client        | Interactive tabs         |
| TrendingSection | Server        | Data display             |
| NewOnWebtoon    | Server        | Data display             |
| EpisodeList     | Client        | Interactive              |
| episode/\*      | Client        | Viewer controls          |

- [x] **3.1** Migrate layout components (Header, Footer)
- [x] **3.2** Migrate card/display components
- [x] **3.3** Migrate interactive components with "use client"
- [x] **Fix** Resolve type compatibility issues with React 19 (Radix UI, Recharts)

---

## Phase 4: Data Fetching Patterns

**Goal:** Replace react-query with Next.js patterns

| Current (React Query) | Next.js Pattern             |
| --------------------- | --------------------------- |
| `useQuery` in client  | Server Component fetch      |
| React Query cache     | Next.js Request Memoization |
| Loading states        | Suspense boundaries         |

- [x] **4.1** Create Supabase server client (`src/lib/supabase`)
- [x] **4.2** Implement data fetching in Server Components
- [x] **4.3** Add loading.tsx for Suspense
- [x] **4.4** Handle errors with error.tsx
- [x] **4.5** Implement Asset Bucket Integration (Mock Phase)

---

## Phase 5: Testing & Verification

**Goal:** Ensure parity with existing app, CI/CD passes

- [x] **5.1** Run `bun run build` - no errors (Fixed all build & type errors)
- [x] **5.2** Manual test all routes (龍剣, Moon Hunter verified)
- [x] **5.3** Verify SEO (meta tags, sitemap)
- [x] **5.4** Compare bundle size
- [x] **5.5** Run Lighthouse audit
- [x] **5.6** Commit & Push with clean CI

---

## 📝 Session Log

| Time  | Event               | Notes                                                       |
| ----- | ------------------- | ----------------------------------------------------------- |
| 22:14 | Session started     | Reading project structure                                   |
| 22:15 | Analysis complete   | 4 pages, ~15 components identified                          |
| 23:00 | Build Fixes         | Resolved React 19 type errors                               |
| 23:15 | Supabase Setup      | Added @supabase/ssr & middleware                            |
| 23:30 | Build Success       | bun run build passes                                        |
| 09:30 | Reverted Repo       | Reverted to `fb4b804` and force pushed                      |
| 14:13 | Verification & Push | Successfully ran lint, build, and pushed monorepo structure |

---

## 🎯 Migration Strategy (from Skills)

### From `nextjs-react-expert` skill:

- ✅ Eliminate waterfalls with parallel data fetching
- ✅ Use Server Components by default
- ✅ Dynamic imports for large components
- ✅ No barrel imports

### From `tailwind-patterns` skill:

- ✅ Keep existing Tailwind v3 config initially
- ✅ Migrate to v4 CSS-first in future phase

### From `architecture` skill:

- ✅ Start simple, add complexity when needed
- ✅ Document significant decisions in ADR

---

## 🔧 Commands Reference

```bash
# Create Next.js app
cd apps && bunx create-next-app@latest web-next --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Development
cd apps/web-next && bun run dev

# Build
bun run build

# Lint
bun run lint
```
