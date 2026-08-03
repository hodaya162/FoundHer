# FoundHer Progress

## Project Status

FoundHer is a mobile-first, RTL discovery platform for modest fashion. The project currently has a stable Next.js foundation, typed domain data, repository boundaries, and a reusable design-system foundation. The existing visual prototype remains active and has not yet been migrated to the new shared components.

## Current Architecture

- Next.js 16 App Router and React 19
- TypeScript in strict mode
- Tailwind CSS v4 with semantic CSS tokens
- shadcn/ui configuration with project-owned primitives in `components/ui`
- Domain models in `domain`
- Typed fixture data in `data/fixtures`
- Synchronous fixture-backed repositories in `lib/repositories`
- Shared layout primitives in `components/layout`
- Legacy prototype pages and styles retained until page migration

## Completed Tasks

- TASK 001 — Infrastructure Stabilization
- TASK 002 — Domain Models and Typed Fixtures
- TASK 003 — FoundHer Design System Foundation

## Latest Commit

- Current TASK 003 commit: `feat: build FoundHer design system foundation` (this document is included in that commit)
- Parent commit: `b96659c` — `feat: add FoundHer domain models and typed fixtures`

## Current Branch

- `main`

## Known Technical Debt

- Prototype pages still use hardcoded arrays instead of repositories and typed fixtures.
- `PageShell` remains a legacy presentation component and intentionally has not been refactored.
- Product routing is static rather than slug-based.
- Authentication, persistence, Supabase, search, filters, and favorites behavior are not implemented.
- The legacy stylesheet remains largely selector-based and contains hardcoded component colors, repeated prototype overrides, and compressed rules. It should be retired incrementally as pages migrate.
- The existing navigation does not yet expose active-route state with `aria-current`.
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
- Existing `/` and `/product` pages: browser smoke test passes with no console errors
- `npm run validate:fixtures`: blocked by the environment-specific `tsx`/`os.userInfo()` error noted above; independent fixture audit found no duplicate entity IDs or missing references

## Next Planned Task

- TASK 004 — build the modular Application Shell (header, bottom navigation, and layout foundation), then plan the controlled retirement of `PageShell`. Not started.

This document must be updated at the end of every future task.
