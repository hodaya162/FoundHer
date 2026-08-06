# FoundHer Progress

## Project Status

FoundHer is a mobile-first, RTL inspiration platform for modest fashion. Its product promise is to help women decide what to wear through complete looks and then access the purchase and rental products that create them. The codebase has a stable Next.js foundation, typed domain data, repository boundaries, a reusable design system, a modular application shell, repository-backed product discovery, and dynamic product pages.

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
- First-class Look model with editorial stories, typed occasions, style tags, season tags, ordered products, and brand relationships
- Product-first rental repository capabilities for evening, bridal, featured, and city discovery
- Product information architecture documented in `docs/product-architecture.md`
- Legacy prototype pages and styles retained until page migration

## Completed Tasks

- TASK 001 — Infrastructure Stabilization
- TASK 002 — Domain Models and Typed Fixtures
- TASK 003 — FoundHer Design System Foundation
- TASK 004 — FoundHer Application Shell and Navigation
- TASK 005 — Discover Product Architecture Migration
- TASK 006 — Dynamic Product Feature System and Product Pages
- TASK 007 — Inspiration-First Product Realignment

## Latest Commit

- Current TASK 007 commit: `refactor: align FoundHer around inspiration discovery` (the final hash is reported in the PR and task handoff because a commit cannot contain its own hash)
- Parent commit: `135ef10` — merged TASK 006 baseline

## Current Branch

- `codex/task-007-product-realignment`

## Inspiration-First Product Decision

- Looks are FoundHer's primary discovery unit. They combine a visual, scenario, story, occasion, style, season, products, and brands.
- Products support the inspiration journey and retain the existing discriminated union as the only source of purchase/rental state.
- Purchase and rental products may coexist in the same ordered look without duplicating product records.
- Rentals discovery begins with evening and bridal dresses. Rental businesses provide context after product interest and are not the landing-page feed.
- The approved future primary mobile navigation is Home, Looks, Rentals, Favorites, and Profile.
- Brands is a secondary entity and must not appear in primary mobile navigation. Brand discovery comes from Product pages, Look pages, curated Home sections, future search, and “more from this brand” links.
- `/discover` remains operational but transitional until the new Looks feed and Look Details experience are complete. It should then leave primary navigation and redirect to `/looks` only after reusable product-result behavior moves to dedicated result routes.

## Look Domain and Repository

- `Look` now includes `story`, typed `occasions`, `styleTags`, and `seasonTags` alongside ordered `productIds` and `brandIds`.
- Stable domain identifiers are separate from future Hebrew UI labels.
- Four Look fixtures provide a clear scenario and editorial context. `modern-evening-romance` combines a rental dress and a purchase accessory.
- Look queries support occasion, style, season, product, and brand discovery with stable fixture ordering.
- `getProductsByIds` resolves known products in caller-supplied order for future Look Details composition.
- Rental product queries support evening, bridal, featured, and exact-city result sets without introducing a generic query framework.

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
- `/discover` remains a transitional product grid until the final Looks feed and Look Details route exist.
- Dynamic `/looks/[slug]`, `/brands/[slug]`, and `/rental-businesses/[slug]` routes are not implemented.
- The final rental-product-first Rentals feed is not implemented.
- Authentication, persistence, Supabase, search, filters, and favorites behavior are not implemented.
- The legacy stylesheet remains largely selector-based and contains hardcoded component colors, repeated prototype overrides, and compressed rules. It should be retired incrementally as pages migrate.
- The project does not yet have unit, integration, or end-to-end test suites.

## Remaining Warnings

- ESLint reports 4 existing `@next/next/no-img-element` warnings in untouched legacy pages. TASK 006 introduces no warnings and uses `next/image` for product galleries.
- `npm audit` reports 6 vulnerable dependency entries: 5 high and 1 low.
  - Production: direct `next@16.2.6` and transitive `postcss`/`sharp` advisories. Recommended action: review and upgrade Next.js to at least `16.2.12` in a dedicated dependency update, then run the full validation suite.
  - Development/transitive tooling: `@babel/core` (low), `brace-expansion` (high), and `js-yaml` (high). Recommended action: update the parent lint/build tooling through normal dependency upgrades and re-run `npm audit`; do not force resolutions without compatibility testing.

## Validation Status

- `npm run lint`: passes with 4 pre-existing image warnings
- `npm run typecheck`: passes
- `npm run build`: passes; all repository products are statically generated under `/products/[slug]`
- `npm run validate:fixtures`: passes; validates 8 purchase products, 4 evening rentals, 2 bridal rentals, 4 looks, 4 brands, 2 rental businesses, and 6 categories
- TASK 007 integrity coverage: valid Look products and brands, non-empty looks, unique slugs, typed occasion/style/season values, a mixed purchase/rental fixture, and valid rental-business references
- Product browser validation: purchase, evening-rental, and bridal-rental variants render in RTL; dynamic titles and canonical metadata resolve; external actions use safe link attributes; invalid slugs return the product 404; desktop and mobile layouts have no horizontal overflow; gallery images load with meaningful alternative text
- Discover browser validation: 14 repository-backed products; one/two/four responsive columns at mobile/tablet/desktop; RTL; no horizontal overflow; no nested interactive elements; valid slug links; 44px favorite targets; meaningful image alt text; no console warnings or errors
- `/design-system`: verified in desktop and mobile browser contexts, RTL, noindex/nofollow, no horizontal overflow, visible focus, accessible names, and no nested interactive elements
- All existing routes: browser smoke-tested through the shared application shell

## Modest Fashion Imagery

- All prototype and fixture imagery now uses project-local assets under `public/images/products`.
- The curated image set follows the supplied modern Israeli modest-fashion reference: uncovered hair, knee-to-midi silhouettes, sleeves, moderate necklines, clean styling, and no hijab or abaya imagery.
- Remote Pexels and Unsplash runtime dependencies were removed from application code and fixtures.
- Discover now uses the standard Next.js image optimization path for local assets.
- The images are free-to-use Pexels stock assets; their source pages and license remain governed by the Pexels license.

## Git Workflow Note

- TASK 001 through TASK 006 are merged into `main`. TASK 007 is developed on `codex/task-007-product-realignment`; its draft PR targets `main` and must not be merged without review.

## Next Planned Task

- Build the repository-backed Looks feed and dynamic Look Details route after approving the information hierarchy and navigation switch described in `docs/product-architecture.md`.

This document must be updated at the end of every future task.
