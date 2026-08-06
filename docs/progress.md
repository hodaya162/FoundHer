# FoundHer Progress

## Project Status

FoundHer is a mobile-first, RTL discovery platform for modest fashion. The project currently has a stable Next.js foundation, typed domain data, repository boundaries, a reusable design system, a modular application shell, a repository-backed Discover feature, and dynamic repository-backed product pages. The remaining visual prototype pages stay active until they are migrated incrementally.

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
- Product feature module in `features/products` with typed card and detail presentation models, repository composition queries, cards, grids, a responsive gallery, purchase/rental detail panels, actions, loading, and empty states
- Repository-backed Discover page with metadata, visual search/filter controls, and `next/image`
- Legacy prototype pages and styles retained until page migration

## Completed Tasks

- TASK 001 — Infrastructure Stabilization
- TASK 002 — Domain Models and Typed Fixtures
- TASK 003 — FoundHer Design System Foundation
- TASK 004 — FoundHer Application Shell and Navigation
- TASK 005 — Discover Product Architecture Migration
- TASK 006 — Dynamic Product Feature System and Product Pages

## Latest Commit

- Current TASK 006 commit: `feat: build dynamic product feature` (the final hash is reported in the PR and task handoff because a commit cannot contain its own hash)
- Parent commit: `554648b` — merged TASK 005 baseline

## Current Branch

- `codex/task-006-product-pages`

## Product Feature Architecture

- `app/products/[slug]/page.tsx` resolves products through a feature query and repository interfaces only; fixture modules are never imported by the route or feature.
- `ProductDetails` is a discriminated union. Purchase products require a brand relationship, while rental products require a rental-business relationship; unresolved associations degrade to clear fallback copy instead of crashing.
- Focused components own breadcrumbs, gallery, header, prices, descriptions, sizes, colors, brand or rental-business information, metadata, badges, sections, and action presentation.
- The responsive gallery uses `next/image`, meaningful alternative text, stable aspect ratios, and a safe empty-image fallback.
- Purchase and rental panels are separate typed branches. Each exposes only the price, seller, metadata, and primary action appropriate to its product type.
- Every repository product slug is statically generated. Unknown slugs use `notFound()` and a product-specific, accessible 404 state.
- Product metadata is generated dynamically from the resolved product and seller, including canonical, Open Graph, and Twitter data.
- The old hardcoded `/product` implementation was removed; the route remains only as a compatibility redirect to a valid dynamic product URL. No project files were deleted.

## Discover Architecture

- `app/discover/page.tsx` is a Server Component that composes page-level UI and never imports fixtures.
- `features/products/queries/get-discover-product-cards.ts` reads repository data and resolves each product's brand or rental business before presentation.
- `ProductCardModel` is a discriminated union. Purchase and rental prices, labels, cities, and CTA copy are required by their matching type rather than inferred from optional fields.
- Product presentation is split into focused components: card, grid, image, title, price, metadata, badge, favorite control, actions, empty state, and skeleton grid.
- Product links use the implemented `/products/[slug]` route.
- The favorite control is visual only, remains keyboard-focusable, and is a sibling of product links rather than nested inside them.
- Discover search and filter controls are presentational only. Search, filtering, sorting, pagination, persistence, and API behavior remain out of scope.

## Application Shell

- `app/layout.tsx` remains a Server Component and owns the skip link, shell structure, stable `#main-content` target, header, footer, and mobile navigation.
- `SiteHeader`, `SiteFooter`, `SiteLogo`, and `PageContainer` are reusable Server Components.
- `DesktopNavigation` and `MobileBottomNavigation` are the only new Client Components. They use `usePathname` solely to expose active route styling and `aria-current="page"`.
- Navigation routes and labels are defined once in `config/navigation.ts`. Root matching is exact; other routes match the route itself or a slash-delimited descendant.
- The desktop header remains sticky because it preserves context without covering content. The mobile shell reserves the navigation token height plus the device safe area at the bottom.

## Known Technical Debt

- Home, Brands, Looks, Rentals, Favorites, and Profile still contain legacy prototype presentation or hardcoded data.
- `PageShell` remains a legacy presentation component for the untouched pages. Discover no longer imports or depends on it.
- Authentication, persistence, Supabase, search, filters, and favorites behavior are not implemented.
- The legacy stylesheet remains largely selector-based and contains hardcoded component colors, repeated prototype overrides, and compressed rules. It should be retired incrementally as pages migrate.
- The project does not yet have unit, integration, or end-to-end test suites.
- Fixture validation uses `tsx`, which currently fails on this Windows/Node 24 environment because `os.userInfo()` returns `ENOMEM`; type checking and an independent reference audit still pass.

## Remaining Warnings

- ESLint reports 4 existing `@next/next/no-img-element` warnings in untouched legacy pages. TASK 006 introduces no warnings and uses `next/image` for product galleries.
- `npm audit` reports 6 vulnerable dependency entries: 5 high and 1 low.
  - Production: direct `next@16.2.6` and transitive `postcss`/`sharp` advisories. Recommended action: review and upgrade Next.js to at least `16.2.12` in a dedicated dependency update, then run the full validation suite.
  - Development/transitive tooling: `@babel/core` (low), `brace-expansion` (high), and `js-yaml` (high). Recommended action: update the parent lint/build tooling through normal dependency upgrades and re-run `npm audit`; do not force resolutions without compatibility testing.

## Validation Status

- `npm run lint`: passes with 4 pre-existing image warnings
- `npm run typecheck`: passes
- `npm run build`: passes; all repository products are statically generated under `/products/[slug]`
- Product browser validation: purchase, evening-rental, and bridal-rental variants render in RTL; dynamic titles and canonical metadata resolve; external actions use safe link attributes; invalid slugs return the product 404; desktop and mobile layouts have no horizontal overflow; gallery images load with meaningful alternative text
- Discover browser validation: 14 repository-backed products; one/two/four responsive columns at mobile/tablet/desktop; RTL; no horizontal overflow; no nested interactive elements; valid slug links; 44px favorite targets; meaningful image alt text; no console warnings or errors
- `/design-system`: verified in desktop and mobile browser contexts, RTL, noindex/nofollow, no horizontal overflow, visible focus, accessible names, and no nested interactive elements
- All existing routes: browser smoke-tested through the shared application shell
- `npm run validate:fixtures`: still blocked before script execution by the environment-specific `tsx`/`os.userInfo()` error noted above; the successful production build executes the repository-backed Discover composition and found no missing associations

## Modest Fashion Imagery

- All prototype and fixture imagery now uses project-local assets under `public/images/products`.
- The curated image set follows the supplied modern Israeli modest-fashion reference: uncovered hair, knee-to-midi silhouettes, sleeves, moderate necklines, clean styling, and no hijab or abaya imagery.
- Remote Pexels and Unsplash runtime dependencies were removed from application code and fixtures.
- Discover now uses the standard Next.js image optimization path for local assets.
- The images are free-to-use Pexels stock assets; their source pages and license remain governed by the Pexels license.

## Git Workflow Note

- TASK 004 and TASK 005 are merged into `main`. TASK 006 is developed on `codex/task-006-product-pages` and its draft PR targets `main` without merging.

## Next Planned Task

- Review and approve the next feature scope after TASK 006 is reviewed and merged; no subsequent implementation is assumed by this task.

This document must be updated at the end of every future task.
