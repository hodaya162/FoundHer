# FoundHer Progress

## Project Status

FoundHer is a mobile-first, RTL discovery platform for modest fashion. The project currently has a stable Next.js foundation, typed domain data, repository boundaries, a reusable design system, a modular application shell, and a repository-backed Discover feature. The remaining visual prototype pages stay active until they are migrated incrementally.

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
- Product feature module in `features/products` with typed presentation models, composition queries, helpers, cards, grids, loading, and empty states
- Repository-backed Discover page with metadata, visual search/filter controls, and `next/image`
- Legacy prototype pages and styles retained until page migration

## Completed Tasks

- TASK 001 — Infrastructure Stabilization
- TASK 002 — Domain Models and Typed Fixtures
- TASK 003 — FoundHer Design System Foundation
- TASK 004 — FoundHer Application Shell and Navigation
- TASK 005 — Discover Product Architecture Migration

## Latest Commit

- Current TASK 005 commit: `feat: migrate Discover to new product architecture` (the final hash is reported in the PR and task handoff because a commit cannot contain its own hash)
- Parent commit: `0886d04` — TASK 004 application shell

## Current Branch

- `codex/task-005-discover`

## Discover Architecture

- `app/discover/page.tsx` is a Server Component that composes page-level UI and never imports fixtures.
- `features/products/queries/get-discover-product-cards.ts` reads repository data and resolves each product's brand or rental business before presentation.
- `ProductCardModel` is a discriminated union. Purchase and rental prices, labels, cities, and CTA copy are required by their matching type rather than inferred from optional fields.
- Product presentation is split into focused components: card, grid, image, title, price, metadata, badge, favorite control, actions, empty state, and skeleton grid.
- Product links use `/products/[slug]`; the dynamic route is intentionally deferred.
- The favorite control is visual only, remains keyboard-focusable, and is a sibling of product links rather than nested inside them.
- Discover search and filter controls are presentational only. Search, filtering, sorting, pagination, persistence, and API behavior remain out of scope.

## Application Shell

- `app/layout.tsx` remains a Server Component and owns the skip link, shell structure, stable `#main-content` target, header, footer, and mobile navigation.
- `SiteHeader`, `SiteFooter`, `SiteLogo`, and `PageContainer` are reusable Server Components.
- `DesktopNavigation` and `MobileBottomNavigation` are the only new Client Components. They use `usePathname` solely to expose active route styling and `aria-current="page"`.
- Navigation routes and labels are defined once in `config/navigation.ts`. Root matching is exact; other routes match the route itself or a slash-delimited descendant.
- The desktop header remains sticky because it preserves context without covering content. The mobile shell reserves the navigation token height plus the device safe area at the bottom.

## Known Technical Debt

- Home, Brands, Looks, Rentals, Favorites, Profile, and the static product page still contain legacy prototype presentation or hardcoded data.
- `PageShell` remains a legacy presentation component for the untouched pages. Discover no longer imports or depends on it.
- Product cards now point to slug-based routes, but `app/products/[slug]` has not been created; `app/product` remains a legacy placeholder.
- Authentication, persistence, Supabase, search, filters, and favorites behavior are not implemented.
- The legacy stylesheet remains largely selector-based and contains hardcoded component colors, repeated prototype overrides, and compressed rules. It should be retired incrementally as pages migrate.
- The project does not yet have unit, integration, or end-to-end test suites.
- Fixture validation uses `tsx`, which currently fails on this Windows/Node 24 environment because `os.userInfo()` returns `ENOMEM`; type checking and an independent reference audit still pass.

## Remaining Warnings

- ESLint reports 6 existing `@next/next/no-img-element` warnings in legacy pages. TASK 005 introduces no warnings and uses `next/image` for Discover.
- `npm audit` reports 6 vulnerable dependency entries: 5 high and 1 low.
  - Production: direct `next@16.2.6` and transitive `postcss`/`sharp` advisories. Recommended action: review and upgrade Next.js to at least `16.2.12` in a dedicated dependency update, then run the full validation suite.
  - Development/transitive tooling: `@babel/core` (low), `brace-expansion` (high), and `js-yaml` (high). Recommended action: update the parent lint/build tooling through normal dependency upgrades and re-run `npm audit`; do not force resolutions without compatibility testing.

## Validation Status

- `npm run lint`: passes with 6 pre-existing image warnings
- `npm run typecheck`: passes
- `npm run build`: passes; all routes are statically generated
- Discover browser validation: 14 repository-backed products; one/two/four responsive columns at mobile/tablet/desktop; RTL; no horizontal overflow; no nested interactive elements; valid slug links; 44px favorite targets; meaningful image alt text; no console warnings or errors
- `/design-system`: verified in desktop and mobile browser contexts, RTL, noindex/nofollow, no horizontal overflow, visible focus, accessible names, and no nested interactive elements
- All existing routes: browser smoke-tested through the shared application shell
- `npm run validate:fixtures`: still blocked before script execution by the environment-specific `tsx`/`os.userInfo()` error noted above; the successful production build executes the repository-backed Discover composition and found no missing associations

## Modest Fashion Imagery

- All prototype and fixture imagery now uses project-local assets under `public/images/products`.
- The curated image set follows FoundHer's Jewish modest-fashion direction: opaque long garments, covered shoulders and arms, and restrained styling.
- Remote Pexels and Unsplash runtime dependencies were removed from application code and fixtures.
- Discover now uses the standard Next.js image optimization path for local assets.
- The images are free-to-use Pexels stock assets; their source pages and license remain governed by the Pexels license.

## Git Workflow Note

- TASK 004 PR #2 is still open and unmerged. TASK 005 is therefore a stacked branch based on `codex/task-004-application-shell`; its draft PR should target that branch until PR #2 is merged, then be retargeted to `main`.

## Next Planned Task

- The next feature migration requires scope review and explicit approval before implementation.

This document must be updated at the end of every future task.
