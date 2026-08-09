# FoundHer Progress

## Project Status

FoundHer is a mobile-first, RTL inspiration platform for modest fashion. Its product promise is to help women decide what to wear through complete looks and then access the purchase and rental products that create them. The codebase now includes production-ready Looks and rental-dress discovery feeds, dynamic Look, Product, and Rental Business pages, repository-backed composition, and a shared application shell and design system.

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
- Dedicated `features/looks` module with editorial cards, labels, stories, ordered products, similar looks, loading, empty, and missing states
- Repository-backed `/looks` and statically generated `/looks/[slug]` pages with dynamic metadata
- Legacy prototype pages and styles retained until page migration

## Completed Tasks

- TASK 001 — Infrastructure Stabilization
- TASK 002 — Domain Models and Typed Fixtures
- TASK 003 — FoundHer Design System Foundation
- TASK 004 — FoundHer Application Shell and Navigation
- TASK 005 — Discover Product Architecture Migration
- TASK 006 — Dynamic Product Feature System and Product Pages
- TASK 007 — Inspiration-First Product Realignment
- TASK 008 — Looks Inspiration Feed and Dynamic Look Details
- TASK 009 — Rental Dress Discovery and Dynamic Rental Business Pages

## Latest Commit

- Current TASK 009 commit: `feat: build rental dress discovery experience` (the final hash is reported in the PR and task handoff because a commit cannot contain its own hash)
- Parent commit: `6940841` — merged TASK 008 baseline

## Current Branch

- `codex/task-009-rentals`

## Rentals Experience

- `/rentals` is a rental-product-first Server Component and no longer imports the legacy `PageShell`.
- The feed is composed through typed repository helpers and dedicated `features/rentals` presentation models; routes and components never import fixture arrays.
- All, evening, and bridal filters are real server-rendered links backed by the discriminated Product type. Unknown filter values fall back safely to all products.
- City, size, price, and style controls are visibly disabled and labelled as future capabilities, avoiding fake dropdown behavior or client state.
- Rental cards prioritize the dress image, textual rental type, rental price, city, rental business, and the path to the dynamic Product page.
- Rental Product pages retain the existing gallery, sizes, description, price, city, type, and safe external availability CTA. Their breadcrumbs now return to Rentals, and rental-business context includes city and a route to the business page.
- “More from this business” excludes the current product, preserves repository order, limits results to three, and links both dresses and the business destination.
- `/rental-businesses/[slug]` is statically generated from repository slugs, has dynamic canonical/Open Graph/Twitter metadata, and returns a real 404 for unknown slugs.
- Rental Business pages display a cover, identity, city, available contact actions, and a dress-first collection. A business with no products receives a shared empty state.
- Missing rental-business relationships use safe fallback copy and omit related-business UI rather than crashing.
- TASK 009 introduces no Client Components, authentication, persistence, Supabase, live availability, advanced filtering, booking, location, rating, or review behavior.

## Inspiration-First Product Decision

- Looks are FoundHer's primary discovery unit. They combine a visual, scenario, story, occasion, style, season, products, and brands.
- Products support the inspiration journey and retain the existing discriminated union as the only source of purchase/rental state.
- Purchase and rental products may coexist in the same ordered look without duplicating product records.
- Rentals discovery begins with evening and bridal dresses. Rental businesses provide context after product interest and are not the landing-page feed.
- The approved future primary mobile navigation is Home, Looks, Rentals, Favorites, and Profile.
- Brands is a secondary entity and must not appear in primary mobile navigation. Brand discovery comes from Product pages, Look pages, curated Home sections, future search, and “more from this brand” links.
- `/discover` remains operational by direct URL but is no longer in primary navigation. It remains transitional until reusable product-result behavior moves to dedicated result routes.

## Looks Experience

- `/looks` is a Server Component that consumes `getAllLooks()` and presents an editorial Look grid rather than a product catalog.
- `LookCard` keeps the cover dominant and limits context to one occasion, one season, a story excerpt, product count, and a separate visual-only save button.
- `/looks/[slug]` is statically generated from repository slugs, returns `notFound()` for unknown slugs, and generates canonical, Open Graph, and Twitter metadata from the Look.
- Look Details follows a stable hierarchy: breadcrumbs, hero and header, story, ordered linked products, and similar Looks.
- Linked products resolve through `getProductsByIds` in configured order. Purchase items show brand and price; rental items show rental business, rental price, city, and textual commercial type.
- Missing products are omitted safely and reported on the page; missing sellers use clear fallback labels.
- Similar Looks scores shared occasion first, shared style second, and shared season third; excludes the current Look; preserves fixture order for ties; and returns at most three results.
- All Look presentation remains server-rendered. The save button is intentionally visual-only and introduces no Client Component, persistence, authentication, or local storage.
- The legacy `/looks` dependency on `PageShell` was removed. `PageShell` remains for untouched legacy screens.

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

- Home, Brands, Favorites, and Profile still contain legacy prototype presentation or hardcoded data.
- `PageShell` remains a legacy presentation component for the untouched pages. Discover no longer imports or depends on it.
- `/discover` remains a transitional product grid retained for future search/category/product-result migration.
- Dynamic `/brands/[slug]` routes are not implemented.
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
- `npm run build`: passes; 29 pages are generated, including 4 Look routes and 14 Product routes
- `npm run validate:fixtures`: passes; validates 8 purchase products, 4 evening rentals, 2 bridal rentals, 4 looks, 4 brands, 2 rental businesses, and 6 categories
- TASK 007 integrity coverage: valid Look products and brands, non-empty looks, unique slugs, typed occasion/style/season values, a mixed purchase/rental fixture, and valid rental-business references
- TASK 008 browser validation: `/looks` and all 4 Look routes render in RTL at 375/768/1024/1440px with no horizontal overflow; one/two/three-column feed behavior; loaded images and meaningful alt text; correct metadata, breadcrumbs, heading hierarchy, product ordering, purchase/rental labels, Similar Looks, 44px save targets, visible keyboard focus, and no nested interactive controls
- TASK 009 validation: `/rentals` renders 6 repository-backed rental dresses and its server-rendered type filters return 4 evening or 2 bridal results. Cards render in one/two/three columns at 375/768/1024/1440px with no horizontal overflow, loaded images, textual rental types, 44px filter targets, and visible keyboard focus.
- Rental Product validation: evening and bridal variants expose the correct price, city, sizes, type, business link, and safe external availability URL. “More from this business” excludes the current product, preserves repository order, and remains limited to three results.
- Rental Business validation: both configured routes render one h1, safe contact actions, loaded cover/logo/product images, dress-first collections, canonical metadata, RTL, and no nested interactive elements. Unknown business slugs return HTTP 404 with `noindex`.
- Mixed Look validation: rental and purchase items render in configured order and link to their dynamic Product pages; unknown Look slugs return HTTP 404 with `noindex`; `/discover` remains directly accessible but absent from primary navigation
- Browser console validation: no warnings or errors were reported for the tested Looks, Product-link, invalid-slug, navigation, or transitional Discover flows
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

- TASK 001 through TASK 008 are merged into `main`. TASK 009 is developed on `codex/task-009-rentals`; its draft PR targets `main` and must not be merged without review.

## Next Planned Task

- Recommended TASK 010: define and build the next inspiration-first surface, with Brand discovery or final Home remaining the primary product decision. Do not start until TASK 009 is reviewed and merged.

This document must be updated at the end of every future task.
