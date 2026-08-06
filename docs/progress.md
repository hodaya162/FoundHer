# FoundHer Progress

## Project Status

FoundHer is a mobile-first, RTL discovery platform for modest fashion. The project currently has a stable Next.js foundation, typed domain data, repository boundaries, a reusable design system, and a modular application shell. The existing visual prototype remains active and has not yet been migrated to the repository-backed content components.

## Current Architecture

- Next.js 16 App Router and React 19
- TypeScript in strict mode
- Tailwind CSS v4 with semantic CSS tokens
- shadcn/ui configuration with project-owned primitives in `components/ui`
- Domain models in `domain`
- Typed fixture data in `data/fixtures`
- Synchronous fixture-backed repositories in `lib/repositories`
- Shared layout primitives in `components/layout`
- Centralized site and navigation configuration in `config`
- Server-rendered root shell and desktop header with route-aware client navigation islands
- Fixed, safe-area-aware mobile bottom navigation
- Legacy prototype pages and styles retained until page migration

## Completed Tasks

- TASK 001 — Infrastructure Stabilization
- TASK 002 — Domain Models and Typed Fixtures
- TASK 003 — FoundHer Design System Foundation
- TASK 004 — FoundHer Application Shell and Navigation

## Latest Commit

- Current TASK 004 commit: `feat: build FoundHer application shell` (the final hash is reported in the PR and task handoff because a commit cannot contain its own hash)
- Parent commit: `1606d46` — merge TASK 003 into `main`

## Current Branch

- `codex/task-004-application-shell`

## Application Shell

- `app/layout.tsx` remains a Server Component and owns the skip link, shell structure, stable `#main-content` target, header, footer, and mobile navigation.
- `SiteHeader`, `SiteFooter`, `SiteLogo`, and `PageContainer` are reusable Server Components.
- `DesktopNavigation` and `MobileBottomNavigation` are the only new Client Components. They use `usePathname` solely to expose active route styling and `aria-current="page"`.
- Navigation routes and labels are defined once in `config/navigation.ts`. Root matching is exact; other routes match the route itself or a slash-delimited descendant.
- The desktop header remains sticky because it preserves context without covering content. The mobile shell reserves the navigation token height plus the device safe area at the bottom.

## Known Technical Debt

- Prototype pages still use hardcoded arrays instead of repositories and typed fixtures.
- `PageShell` remains a legacy presentation component and intentionally has not been refactored.
- Product routing is static rather than slug-based.
- Authentication, persistence, Supabase, search, filters, and favorites behavior are not implemented.
- The legacy stylesheet remains largely selector-based and contains hardcoded component colors, repeated prototype overrides, and compressed rules. It should be retired incrementally as pages migrate.
- The project does not yet have unit, integration, or end-to-end test suites.
- Fixture validation uses `tsx`, which currently fails on this Windows/Node 24 environment because `os.userInfo()` returns `ENOMEM`; type checking and an independent reference audit still pass.

## Remaining Warnings

- ESLint reports 6 existing `@next/next/no-img-element` warnings in legacy pages. TASK 003 introduced no new image warnings.
- `npm audit` reports 6 vulnerable dependency entries: 5 high and 1 low.
  - Production: direct `next@16.2.6` and transitive `postcss`/`sharp` advisories. Recommended action: review and upgrade Next.js to at least `16.2.12` in a dedicated dependency update, then run the full validation suite.
  - Development/transitive tooling: `@babel/core` (low), `brace-expansion` (high), and `js-yaml` (high). Recommended action: update the parent lint/build tooling through normal dependency upgrades and re-run `npm audit`; do not force resolutions without compatibility testing.

## Validation Status

- `npm run lint`: passes with 6 pre-existing image warnings
- `npm run typecheck`: passes
- `npm run build`: passes; all routes are statically generated
- `/design-system`: verified in desktop and mobile browser contexts, RTL, noindex/nofollow, no horizontal overflow, visible focus, accessible names, and no nested interactive elements
- All existing routes: browser smoke-tested through the shared application shell
- `npm run validate:fixtures`: blocked by the environment-specific `tsx`/`os.userInfo()` error noted above; independent fixture audit found no duplicate entity IDs or missing references

## Next Planned Task

- TASK 005 — migrate the first page/content slice to repository-backed, reusable domain components. Scope requires review before implementation.

This document must be updated at the end of every future task.
