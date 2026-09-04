# FoundHer Progress

## Project Status

FoundHer is a mobile-first, RTL inspiration platform for modest fashion. Its product promise is to help women decide what to wear through complete looks and then access the purchase and rental products that create them. The codebase now includes a final inspiration-first Home, production-ready Looks and rental-dress discovery feeds, dynamic Look, Product, and Rental Business pages, repository-backed composition, and a shared application shell and design system.

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
- Server-rendered root shell with a full desktop Header, compact mobile Header, and route-aware client navigation islands
- Fixed, safe-area-aware mobile bottom navigation
- Product feature module in `features/products` with typed card and detail presentation models, repository composition queries, cards, grids, a responsive gallery, purchase/rental detail panels, actions, loading, and empty states
- Repository-backed Discover page with metadata, a real Search handoff, honest internal detail links, and `next/image`
- First-class Look model with editorial stories, typed occasions, style tags, season tags, ordered products, and brand relationships
- Product-first rental repository capabilities for evening, bridal, featured, and city discovery
- Product information architecture documented in `docs/product-architecture.md`
- Dedicated `features/looks` module with editorial cards, labels, stories, ordered products, similar looks, loading, empty, and missing states
- Repository-backed `/looks` and statically generated `/looks/[slug]` pages with dynamic metadata
- Dedicated `features/home` editorial composition with typed occasion entry points and reused Look, Rental, Brand, and Product presentation
- Dedicated `features/search` module with normalization, deterministic scoring, typed grouped results, query composition, focused presentation, and script-level tests
- Dedicated `features/favorites` module with a stable reference model, defensive browser storage adapter, reactive service, shared accessible button, category views, and focused tests
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
- TASK 010 — Final Inspiration-First Home Experience
- TASK 011 — Unified MVP Search Experience
- TASK 012 — Persistent Favorites Experience
- TASK 013 — FoundHer MVP Readiness Audit
- TASK 014 — Launch Data & Link Integrity
- TASK 015 — Dependency & Security Hardening
- TASK 016 — Production Readiness
- TASK 017 / 017A — Public Vercel Preview
- TASK 018–018E — Mobile UX/UI and Home Refinement
- TASK 020 — Neutral Demo Brand Identity Cleanup
- TASK 021 — Looks Functional Foundation (implementation complete; awaiting Preview review and merge)

## Latest Commit

- Current TASK 021 commit: reported in the Draft PR and final task handoff because a commit cannot contain its own hash.
- Parent commit: `3151e00` — merged TASK 020 baseline.

## Current Branch

- `codex/task-021-looks-foundation`

## Launch Data and Link Integrity

- TASK 014 removes every fixture purchase, rental-availability, brand, rental-business, Instagram, and WhatsApp URL that could be mistaken for a verified real destination. No replacement URL was invented.
- Purchase and rental destination fields are now optional. Product details omit unavailable external CTAs and show an honest non-interactive explanation while preserving the working internal detail and Favorites journeys.
- The non-functional Product Share action and the inert Discover filter buttons were removed. Product, Rental, Search, and Look cards now use honest internal-detail labels instead of implying that availability or an external seller is already verified.
- All current Brand and Rental Business fixtures explicitly declare `isDemo: true`. Home, Search, Favorites, Product, Rental, Look, and Rental Business surfaces disclose demo status wherever those sellers appear.
- Legacy Brands and unavailable Profile entry points were removed from desktop/mobile navigation and the desktop Header. Their direct routes now return the application 404 instead of presenting fake controls or unavailable account behavior. The Home Brands section no longer links to the legacy directory.
- `scripts/test-link-integrity.ts` and `npm run test:links` guard external URL structure, known placeholder hosts and phone numbers, demo declarations, public navigation, and `href="#"` regressions.
- Real purchase URLs, availability/contact destinations, verified business/brand identities, approved descriptions, logos, and image rights are still required from the project owner before those external actions can be enabled for public launch.

## MVP Readiness Audit

- TASK 013 completed a documentation-only audit of product journeys, content, navigation, legacy code, SEO, accessibility, performance, security/privacy, dependencies, testing, and deployment readiness.
- Current status: the core curated MVP and its dependency/production-readiness architecture are functionally complete but it is **not ready for public launch**. Remaining blockers are verified real partner content, an owner-approved production domain, a connected Vercel project, and deployed Preview QA.
- Supabase and authentication are not required for the first public MVP. Browser-local Favorites are acceptable when their one-browser limitation is disclosed.
- The full prioritized findings, decisions, and exact launch checklist are in `docs/mvp-readiness.md`.

## Favorites Experience

- `/favorites` replaces the legacy placeholder with a real personal collection and accessible filters for All, Looks, Products, Rentals, and Brands.
- Favorites store stable `{ entityType, entityId }` references only. Rental products remain `product` entities and are classified from `product.type`.
- A defensive `LocalFavoritesStorage` adapter handles absent, malformed, duplicated, outdated, or unavailable browser storage without crashing.
- A small reactive service synchronizes every FavoriteButton on the current page; the native `storage` event refreshes other open tabs.
- The shared FavoriteButton exposes a real toggle, dynamic Hebrew accessible name, `aria-pressed`, a textual state in detail actions, visible focus, and a 44px minimum target.
- Look cards/details, Product cards/details, Rental cards, Search results, and reused Home cards now share working persistence. Brand saving is available from Search and curated Home cards without inventing a Brand detail route.
- Existing domain cards remain server-rendered. Only FavoriteButton and the repository-backed `/favorites` collection are Client Components.
- The All view keeps entity types in distinct sections, and category views provide honest empty states. Saved Looks and Products return to their implemented dynamic routes.
- `scripts/test-favorites.ts` covers add, remove, toggle, duplicates, multiple entities, malformed and missing storage, stable serialization, and Product-type rental classification.
- Local browser persistence is an MVP implementation, not the final multi-device solution. The storage boundary is designed so a future Supabase adapter can replace it without rewriting card UI.

## Search Experience

- `/search?q=...` searches Looks, purchase Products, rental Products, Brands, and Rental Businesses through existing repositories without importing fixtures into the route or UI.
- Query state lives in the URL and all Search presentation remains server rendered. TASK 011 adds no Client Components, state library, external search service, Supabase, autocomplete, or persistence.
- Text is normalized consistently and results use deterministic field-aware scoring. Exact title matches rank first; multiword queries require at least two matching terms; fixture order resolves ties.
- Results are grouped by entity and use focused cards with correct detail routes, commerce labels, prices, sellers, cities, and imagery. Brands remain non-interactive until dynamic Brand routes exist.
- Initial and no-result states provide useful example searches and honest paths back to Looks and Rentals.
- The desktop and new compact mobile Header Search action links to `/search`; Home includes a small Search entry point without changing its editorial hierarchy or the five-item mobile bottom navigation.
- Discover's fake readonly search field was replaced with a real link to unified Search. `/discover` remains transitional until an approved product/category migration or redirect is complete.
- `scripts/test-search.ts` covers empty, exact, Product, Brand, city/rental, multiword, no-result, relevance, entity-classification, and URL behavior.

## Home Experience

- `/` is now FoundHer's final editorial entry point and asks the primary product question: “What do you feel like wearing today?”
- Its hierarchy is Hero, typed occasion entries, featured Looks, featured Rentals, selected Brands, selected purchase Products, and one final editorial Looks invitation.
- Home is curated and limited. It displays at most three Looks, three rental dresses, three brands, and four purchase products; complete discovery remains in the dedicated domain routes.
- `HomeHero` uses the first featured Look cover from the Look repository, one primary CTA to Looks, and one secondary CTA to Rentals.
- All eight occasion entries reuse `LookOccasion` identifiers and curated local imagery. They link honestly to `/looks` until a future server-side occasion result flow is approved.
- Featured Looks reuse `LookGrid`; featured Rentals reuse `RentalGrid`; selected Products reuse `ProductGrid`. Home does not duplicate domain cards.
- Brands are editorial, non-interactive cards because `/brands/[slug]` is not implemented. One section action leads to the existing `/brands` route and the limitation is stated on the page.
- Curated sections disappear when their repository results are empty instead of producing repeated empty states.
- Home content is composed through existing repositories and narrow feature queries. No fixtures are imported by the page or Home feature.
- The old quick links, category array, hardcoded product array, fake search, promo markup, compact cards, old Look strip, `<img>` elements, and Home-only CSS were removed.
- Legacy PageShell, masonry, Brands, Favorites, Profile, and transitional Discover styles remain intentionally untouched.
- TASK 010 introduces zero Client Components and no carousel, search, state library, authentication, persistence, Supabase, or new dependency.

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

- `/looks` keeps server rendering and adds shareable URL-based search plus six working filters: All, Everyday, Work, Event, Vacation, and Shabbat. Unknown filters fall back safely to All.
- `LookCard` now renders a reusable collage of two-to-five separate source-product images instead of implying that a generated combined outfit is the purchasable item. It retains concise context, product count, demo disclosure, and the existing persistent Favorite action.
- `/looks/[slug]` is statically generated from repository slugs, returns `notFound()` for unknown slugs, and generates canonical, Open Graph, and Twitter metadata from the Look.
- Look Details follows a stable hierarchy: breadcrumbs, linked product moodboard, header, story, ordered linked products, and similar Looks. Each moodboard tile opens the real internal Product route and may display its own price.
- Linked products resolve from ordered `Look.items`; an optional `imageId` selects a specific original product image. Purchase items show brand and price; rental items show rental business, rental price, city, and textual commercial type.
- Missing products are omitted safely and reported on the page; missing sellers use clear fallback labels.
- Similar Looks scores shared occasion first, shared style second, and shared season third; excludes the current Look; preserves fixture order for ties; and returns at most three results.
- Search and filter composition remains server-rendered. Favorite controls keep the existing focused Client Component and localStorage synchronization; no new client state, authentication, or Supabase behavior was introduced.
- The legacy `/looks` dependency on `PageShell` was removed. `PageShell` remains for untouched legacy screens.

## Look Domain and Repository

- `Look` now includes ordered `items` with `productId` and optional source `imageId`, plus `story`, typed occasions/style/season tags, brand relationships, and explicit demo status.
- Stable domain identifiers are separate from future Hebrew UI labels.
- Five Look fixtures cover Everyday, Work, Event, Vacation, and Shabbat. `modern-evening-romance` combines rental and purchase items; every Look keeps its products as separate source images.
- Look queries support occasion, style, season, product, and brand discovery with stable fixture ordering.
- Fixture integrity now validates two-to-five unique Look items, product existence, optional image references, and ordered resolution. `npm run test:looks` guards filter/query composition, route destinations, ordering, and the required fixture coverage.
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
- Discover filter controls remain presentational only. Its former fake search field now links to the real unified Search route; filtering, sorting, pagination, persistence, and API behavior remain out of scope.

## Application Shell

- `app/layout.tsx` remains a Server Component and owns the skip link, shell structure, stable `#main-content` target, header, footer, and mobile navigation.
- `SiteHeader`, `SiteFooter`, `SiteLogo`, and `PageContainer` are reusable Server Components.
- `DesktopNavigation` and `MobileBottomNavigation` are the only new Client Components. They use `usePathname` solely to expose active route styling and `aria-current="page"`.
- Navigation routes and labels are defined once in `config/navigation.ts`. Root matching is exact; other routes match the route itself or a slash-delimited descendant.
- The Header remains sticky because it preserves context without covering content. Desktop exposes the full navigation and actions; mobile exposes the Logo and Search while the shell reserves the bottom-navigation token height plus the device safe area.

## Known Technical Debt

- Brands and Profile return 404 and are excluded from current navigation and indexing; their future product direction remains undecided.
- `PageShell` remains a legacy presentation component for the untouched pages. Discover no longer imports or depends on it.
- `/discover` remains a transitional product grid retained for future category/product-result migration.
- Dynamic `/brands/[slug]` routes are not implemented.
- Authentication, cloud/multi-device persistence, Supabase, advanced filters, and autocomplete are not implemented.
- The legacy stylesheet remains largely selector-based and contains hardcoded component colors, repeated prototype overrides, and compressed rules. It should be retired incrementally as pages migrate.
- The project has focused Search script tests, but no general unit, integration, or end-to-end test suite yet.

## Remaining Warnings

- ESLint reports 1 existing `@next/next/no-img-element` warning in the untouched legacy `PageShell`. TASK 015 introduces no new lint warnings.
- `npm audit` and `npm audit --omit=dev` report 0 vulnerabilities after TASK 015.

## Validation Status

- `npm run lint`: passes with 1 pre-existing image warning in the untouched legacy `PageShell`
- `npm run typecheck`: passes
- `npm run build`: passes; 34 pages are generated, including native robots/sitemap routes, the dynamic Search route, 4 Look routes, 14 Product routes, and 2 Rental Business routes
- `npm run validate:fixtures`: passes; validates 8 purchase products, 4 evening rentals, 2 bridal rentals, 4 looks, 4 brands, 2 rental businesses, and 6 categories
- `npm run test:search`: passes; covers empty, exact, Product, Brand, city/rental, multiword, no-result, relevance, entity-classification, and URL behavior
- `npm run test:favorites`: passes; covers add, remove, toggle, deduplication, entity types, malformed/missing storage, stable serialization, and rental classification
- `npm run test:production-config`: passes; covers URL validation/normalization, canonical generation, metadata-base fallback, and environment-aware indexing
- TASK 012 browser validation: saving and removing a Look, purchase Product, rental Product, and Brand works across their primary cards and `/favorites`; refresh persistence, same-page synchronization, cross-page state, and native cross-tab synchronization were verified. All and category views expose semantic controls, dynamic `aria-pressed` labels, honest empty states, one h1, RTL, no nested interactive controls, and no console errors.
- TASK 012 responsive validation: `/favorites` was checked at 375/768/1024/1440px with five usable category controls, no horizontal overflow, repository-backed cards, and preserved mobile shell spacing.
- TASK 011 browser validation: `/search` initial, Hebrew rental/city, English Brand, multiword Look, and no-result states render in RTL at 375/768/1024/1440px with one h1 and no horizontal overflow. URLs, result groups, loaded imagery, textual commerce labels, Brand non-links, mobile/desktop shell entry, `noindex, follow`, canonical metadata, and absence of nested interactive controls were verified.
- TASK 007 integrity coverage: valid Look products and brands, non-empty looks, unique slugs, typed occasion/style/season values, a mixed purchase/rental fixture, and valid rental-business references
- TASK 008 browser validation: `/looks` and all 4 Look routes render in RTL at 375/768/1024/1440px with no horizontal overflow; one/two/three-column feed behavior; loaded images and meaningful alt text; correct metadata, breadcrumbs, heading hierarchy, product ordering, purchase/rental labels, Similar Looks, 44px save targets, visible keyboard focus, and no nested interactive controls
- TASK 009 validation: `/rentals` renders 6 repository-backed rental dresses and its server-rendered type filters return 4 evening or 2 bridal results. Cards render in one/two/three columns at 375/768/1024/1440px with no horizontal overflow, loaded images, textual rental types, 44px filter targets, and visible keyboard focus.
- TASK 010 Home validation: `/` renders one h1 and the approved editorial hierarchy in RTL at 375/768/1024/1440px with no horizontal overflow. Occasion cards render in two/four columns; Looks and Rentals render in one/two/three columns; Products render in one/two/four columns; Brands render in one/three columns.
- Home journey validation: Hero CTAs, occasion entries, featured Look, featured rental dress, Brands action, and selected Product links were followed to their real routes. All 25 Home images load after lazy scrolling; bottom navigation reserves 72px on mobile; keyboard focus is visible; canonical metadata resolves; no nested interactive controls or console errors were found.
- Rental Product validation: evening and bridal variants expose the correct price, city, sizes, type, business link, and safe external availability URL. “More from this business” excludes the current product, preserves repository order, and remains limited to three results.
- Rental Business validation: both configured routes render one h1, safe contact actions, loaded cover/logo/product images, dress-first collections, canonical metadata, RTL, and no nested interactive elements. Unknown business slugs return HTTP 404 with `noindex`.
- Mixed Look validation: rental and purchase items render in configured order and link to their dynamic Product pages; unknown Look slugs return HTTP 404 with `noindex`; `/discover` remains directly accessible but absent from primary navigation
- Browser console validation: no warnings or errors were reported for the tested Home, Looks, Rentals, Product-link, invalid-slug, navigation, or transitional Discover flows
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

## Dependency and Security Hardening

- TASK 015 upgraded the direct production dependency `next` from `16.2.6` to the stable supported `16.3.1` release. `eslint-config-next` was upgraded from `16.2.6` to `16.3.1` to keep the framework lint configuration aligned.
- React and React DOM remain at `19.2.6`; Next.js 16.3.1 supports the existing React 19 versions, so no unrelated React upgrade was required.
- Before remediation, `npm audit` reported 7 vulnerabilities: 6 high and 1 low. `npm audit --omit=dev` reported 4 high production vulnerabilities.
- The Next.js update and refreshed lockfile resolved the direct Next.js advisories plus the production-transitive `postcss`, `nanoid`, and `sharp` advisories. The resolved production versions are `postcss@8.5.23`, `nanoid@3.3.18`, and `sharp@0.35.3`.
- A reviewed, non-forced `npm audit fix` updated only compatible transitive versions and resolved the development-only `brace-expansion`, `js-yaml`, and `@babel/core` advisories. No packages were added or removed and no direct dependency other than Next.js and its matching ESLint configuration changed.
- After remediation, both `npm audit` and `npm audit --omit=dev` report 0 vulnerabilities. No vulnerability was intentionally left unresolved, and `npm audit fix --force` was not used.
- `npm ci` succeeds from `package-lock.json` v3. The project remains npm-based and no package-manager migration occurred.
- TASK 015 verification passed: fixture validation, Search tests, Favorites tests, link-integrity tests, TypeScript, production build, full audit, and production-only audit. ESLint passes with the single unchanged legacy `<img>` warning in `PageShell`.
- Browser smoke testing passed for Home, Search, Products, Product detail, Looks, Rentals, Rental Business detail, and Favorites. Navigation and the `/product` redirect worked, demo/link-integrity disclosure remained present, and no hydration, runtime, or console errors were observed.

## Production Readiness

- TASK 016 replaces all `https://foundher.example` runtime values with one validated `NEXT_PUBLIC_SITE_URL` source in `config/site-url.ts`. The variable accepts only an absolute HTTP(S) origin, rejects credentials/path/query/fragment values, and normalizes the origin.
- No production domain was supplied or invented. Without a configured origin, local metadata uses `http://localhost:3000` only as a technical `metadataBase`; canonical tags are omitted, page robots metadata is `noindex`, `/robots.txt` blocks all crawling, and `/sitemap.xml` is empty.
- Vercel Preview is detected through `VERCEL_ENV=preview` and remains non-indexable even when the production origin is available. The production canonical never changes to `VERCEL_URL`; that value is used only as an asset-resolution metadata base when no production origin exists.
- Root metadata now provides the FoundHer title template, Hebrew description, `he_IL` Open Graph locale, site name, default social image, Twitter large-image defaults, and environment-safe robots behavior.
- Home, Search, Looks, Discover, Products, Rentals, and Rental Business metadata now use the shared canonical helper. Existing data-derived titles, descriptions, images, seller context, and invalid-entity `noindex` behavior are preserved.
- `app/sitemap.ts` uses the native Next.js metadata route. Only Home is included when production indexing is enabled. Search, Favorites, Discover, Design System, removed Brands/Profile routes, Looks, Rentals, Product details, and Rental Business details are excluded while their content is demo-only.
- `app/robots.ts` uses the native metadata route. It blocks all crawling in local/preview/unconfigured deployments and, in configured production, allows Home while disallowing personal, transitional, internal, removed, and demo-dependent route prefixes. It references the production sitemap only when indexing is enabled.
- `next.config.ts` adds verified baseline headers: `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`, and `Cross-Origin-Opener-Policy`. CSP is deferred to a real Preview compatibility pass; HSTS is deferred until the HTTPS domain and subdomain policy are approved.
- No `vercel.json` was added because the standard Next.js build, routing, images, and Node engine require no override. `.env.example` and `docs/deployment.md` document the only environment variable and actionable Vercel steps.
- No Vercel Preview was created: the environment has no Vercel CLI, `.vercel` project link, Vercel environment variables, connected Vercel tool, or prior GitHub deployment. No account, project, domain, DNS, or production setting was created or guessed.
- Local production QA passed at 375×812 and 1440×900 for Home, Search, Discover Products, Product detail, Looks, Look detail, Rentals, Rental Business detail, Favorites, and a 404. Direct loads, refresh, client navigation, Search results, Favorites save/remove, RTL, responsive navigation, images, demo disclosures, and absence of overflow/runtime/console errors were verified.
- Production-mode checks verified the five response headers, configured canonical generation, Home-only sitemap, production robots allow/disallow policy, and demo Product `noindex`. Preview-mode checks verified global `noindex`, crawl blocking, an empty sitemap, and canonical retention on the configured production origin.
- `scripts/test-production-config.ts` covers URL validation and normalization, canonical generation, local/Vercel metadata-base fallback, and production/preview/development indexing policy.

## Git Workflow Note

- TASK 001 through TASK 016 are merged into `main`; TASK 016 merge commit `f46a080` is the base of `codex/task-017-vercel-preview`.
- TASK 017 is complete on `codex/task-017-vercel-preview`; its draft PR must not be merged without review.

## Vercel Deployment and Mobile Preview

- TASK 017 authenticated Vercel CLI `59.1.3` with the owner's existing account and reused the existing `FoundHer` team. No project existed, so the minimal `found-her1/foundher` project was created with automatic Next.js detection and standard npm/build defaults.
- The checkout is linked through ignored `.vercel/project.json` metadata. Vercel also created an ignored `.env.local` OIDC token. Neither provider IDs nor local credentials were committed. Automatic GitHub linking was unavailable because the Vercel account does not yet have a GitHub Login Connection; CLI deployment remains functional.
- Real Preview: `https://foundher-3dj23v2nl-found-her1.vercel.app`. The deployment is READY, was uploaded from `codex/task-017-vercel-preview`, and uses Next.js 16.3.1 on Vercel Node 24.x.
- The team default protected the Preview with Vercel Authentication. It was disabled for this demo-only project so the owner can open the URL directly from a normal mobile browser. No password, account invitation, custom domain, DNS, or guessed URL was introduced.
- `NEXT_PUBLIC_SITE_URL` remains unset for Development and Preview. Future Production must set it only to the verified HTTPS production origin. Preview therefore remains noindex, emits no canonical, blocks crawling in `/robots.txt`, and exposes an empty `/sitemap.xml`.
- Mobile Preview QA at 375×812 passed for Home, Search, Discover/Product listing, Product detail, Looks, Look detail, Rentals, Rental Business detail, Favorites, an invalid route, Brands 404, and Profile 404. All pages use Hebrew RTL, load images, have no horizontal overflow, support direct loads and refresh, and expose the expected demo disclosures. Search returned three results for `שמלה`; Favorites save/remove and localStorage persistence worked; client navigation worked.
- Desktop smoke at 1440×900 passed for Home, Product detail, and Rentals with desktop navigation visible, mobile navigation hidden, no broken images, and no overflow. No application hydration/runtime errors were observed; the only captured browser messages came from the earlier Vercel login screen.
- Deployment checks confirmed HTTPS 200 responses for valid routes, 404 for invalid/Brands/Profile routes, `X-Robots-Tag: noindex`, no canonical, no `foundher.example`, blocking robots, an empty sitemap, and all five TASK 016 application headers. Vercel additionally supplies HSTS on its HTTPS platform URL.
- Vercel automatically assigned the first project deployment to its Production environment despite no `--prod` flag, because it was the project's first deployment. It received only a generated `vercel.app` alias and no production origin/custom domain configuration. The second deployment is the confirmed Preview above; future deployments without `--prod` remain previews.
- TASK 017 local verification passed: clean npm install, fixtures, Search, Favorites, link integrity, production configuration, TypeScript, lint with the one unchanged legacy `<img>` warning, a 34-route production build, and both audits at 0 vulnerabilities.

## Public Preview Access Follow-up

- TASK 017A confirmed that the inaccessible Preview was caused by inherited Vercel Authentication with `ssoProtection.deploymentType` set to `all_except_custom_domains`. The `found-her1/foundher` project now has `ssoProtection: null`; password protection and trusted-IP restrictions remain absent. No account-wide security control, custom domain, DNS, or production URL was changed.
- The public Preview remains `https://foundher-3dj23v2nl-found-her1.vercel.app`. Cookie-free, unauthenticated HTTPS requests reached Home, Search, Looks, Rentals, and Favorites with `200` responses and an invalid route with `404`, without a Vercel login or password challenge. `/products` correctly returns `404` because the current product-listing route is `/discover`, not `/products`.
- Public access did not change SEO behavior: Preview responses retain `X-Robots-Tag: noindex`, emit no canonical URL, block crawling through `/robots.txt`, and expose an empty sitemap. `NEXT_PUBLIC_SITE_URL` remains unset, so the generated Preview URL is not treated as the production origin.

## Next Planned Task

- TASK 018 redesigns the existing functional MVP after mobile Preview review rejected the prototype-like product experience. The direction is fashion-first, image-led, restrained, editorial, and mobile-authoritative.
- Redesigned surfaces include Home, Search initial/results, Discover, Looks listing/detail, Rentals listing/business, Product detail, Favorites empty/populated, navigation, and the global 404. Shared typography, color, spacing, card, gallery, rail, empty-state, header, and navigation foundations were consolidated without changing repositories or domain logic.
- Search behavior, Favorites/localStorage synchronization, routes, demo disclosures, commercial-link safeguards, link integrity, metadata, Preview noindex/non-canonical behavior, and production headers remain deliberately unchanged.
- TASK 018 Preview: `https://foundher-qm6l7fta9-found-her1.vercel.app`. Mobile QA at 390×844 covered Home, Search initial/results, Looks listing/detail, Rentals listing/business, Product detail, Favorites empty/populated, client navigation, direct refresh, and 404; desktop smoke ran at 1440×900. No horizontal overflow, visible broken images, or browser console/runtime errors remained. Preview stays public for review, noindex, non-canonical, crawl-blocked, and detached from `NEXT_PUBLIC_SITE_URL`.
- Product completion still requires owner approval of the mobile Preview; Draft PR #17 must not be merged before that review.

## TASK 018B – Approved Home Reference

- TASK 018B is a Home-only follow-up built explicitly on the unmerged TASK 018 / PR #17 branch. PR #17 was not merged or altered as part of this task.
- Home now follows the approved order: compact centered wordmark header, search with a real Search route and filter affordance, one scrolling category row, compact editorial hero, Favorite Brands, “חדש בשבילך”, “לוקים ששווה לשמור”, and “להשכרה עכשיו”.
- New Home-specific composition components isolate the approved rails and card densities without changing Search, Looks, Rentals, Favorites, Product detail, repositories, or domain behavior.
- Product and rental rails show approximately two cards on mobile; the Looks rail uses wider editorial cards. All rails use native RTL horizontal scrolling and snap alignment.
- Existing Search routing, Favorites/localStorage, real entity routes, demo disclosures, safe link behavior, Preview noindex/non-canonical rules, and production headers remain intact.
- Brands remain compact, non-clickable demo tiles because the legacy Brands route is intentionally unavailable. The bottom navigation still exposes the four valid MVP routes; Profile was not fabricated or restored.
- Visual QA covers 360px, 390×844, and 430px mobile widths plus a 1440×900 desktop smoke test. The latest real Preview is `https://foundher-8qdqyoz4d-found-her1.vercel.app`; it loaded without broken images or horizontal overflow, and Home Search and Favorites were exercised successfully on the deployment.
- Preview safeguards remain unchanged: `X-Robots-Tag: noindex`, no canonical, crawl-blocking robots, empty sitemap, and no `foundher.example` or Preview-derived production origin.
- TASK 018B remains product-unapproved until the owner reviews the new Vercel Preview and full-page mobile screenshot. Its Draft PR must not be merged before that approval.
- The original category icons were preserved. Home content now uses a new project-local AI-generated editorial image set for five featured purchase products, three featured Looks, and four featured Rentals. Images follow the approved contemporary Jewish modest-fashion direction and are optimized as 1200px WebP assets under `public/images/generated`.

## TASK 018C – Final Home Information Architecture

- TASK 018C is based on the unmerged TASK 018B branch, which itself depends on unmerged TASK 018 / PR #17. No redesign PR was silently merged.
- Home now follows the owner-approved order: Header, Search, four gateways, editorial Hero, New & Recommended, Recommended Looks, Brands Worth Discovering, Rentals Now, and bottom navigation.
- The four gateways are exactly Looks (`/looks`), Items (`/discover`), Brands (a safe in-page jump to the demo brand rail), and Rentals (`/rentals`). Occasion and item-category filters were removed from Home.
- The owner-supplied mobile inspiration is now the density and hierarchy reference: one full-width Search field, four compact gateways, a shorter editorial Hero, approximately four visible Product cards, approximately three visible Look cards, quiet Brand chips, and one image-led Rental banner.
- A final visual-alignment pass split the Hero into editorial image and copy panels, tightened the Product and Look rails, reduced Brand/Rental height, and removed the redundant mobile footer so the fixed navigation follows the content without a large empty region.
- The owner-requested luxury refinement reduces the visual Favorite circles, moves the sole Home Search icon inside the field at its left edge, removes the duplicate Header Search action, and adds restrained blush surfaces, fine borders, and soft depth without changing behavior.
- The final Favorite treatment removes the visible circle entirely: compact dusty-rose heart glyphs float over Home imagery while retaining a usable transparent hit area. The decorative Header heart was removed; Favorites remains available in primary bottom navigation.
- The original gateway icons and all existing Search, Favorites, route, demo-disclosure, link-integrity, and Preview SEO safeguards remain unchanged.
- Personalized wording was removed: “חדש בשבילך” is now “חדש ומומלץ”, “מותגים אהובים” is now “מותגים שכדאי להכיר”, and the Looks section is “לוקים מומלצים”. Brands now follow the primary fashion and Look discovery content.
- The mobile navigation visually reserves the fifth Profile destination but keeps it disabled and labeled as forthcoming. The legacy `/profile` route remains unavailable and no account, authentication, or user data was fabricated.
- Search, Favorites/localStorage, Product/Look/Rental routes, demo disclosures, external-link safeguards, Preview noindex/non-canonical behavior, production URL rules, and security headers remain unchanged.
- Public TASK 018C Preview: `https://foundher-32comnbgu-found-her1.vercel.app`. Mobile visual QA passed at 360px, 390px, and 430px with no page-level horizontal overflow or browser runtime errors; the continuous 390px Home capture confirms the approved full-page section order and the owner-supplied inspiration density.
- TASK 018C remains product-unapproved until the owner reviews its public Preview and continuous 390px Home screenshot. Its Draft PR must not be merged before explicit approval.

This document must be updated at the end of every future task.

## TASK 018D â€“ Home Refinement

- TASK 018D is a focused refinement branch based on unmerged TASK 018C / PR #19. No prior redesign PR was merged to begin this work, and Home information architecture remains unchanged.
- The Home Header stays centered and minimal with no duplicate Favorites action. A reusable modest maxi-dress-and-sparkle Looks icon now appears in both the Home gateway and mobile bottom navigation; Rentals consistently use a hanger icon.
- Home Product, Look, and featured Rental imagery now share the same Favorite treatment: a 44px accessible hit area, restrained 32â€“34px semi-opaque circular backing, 18â€“20px dusty-rose outline, and a filled heart only when saved. Favorites/localStorage behavior is unchanged.
- The Hero copy is shorter, section links now say “הצג הכל”, Brands use quiet typographic circles without fabricated logos, and the final Rentals section remains one dramatic image-led featured banner rather than another repeated card rail.
- Public TASK 018D Preview: `https://foundher-qwuttk6ea-found-her1.vercel.app`. Local visual QA passed at 360px, 390px, and 430px with no page-level overflow; the deployed 390px Home was opened and captured as one continuous page. Direct unauthenticated requests returned `200` for Home, Search, Looks, Rentals, and Favorites and `404` for an invalid route.
- Preview safety remains intact: every checked route returns `X-Robots-Tag: noindex`, no canonical is emitted, `robots.txt` blocks crawling, the sitemap contains no URLs, and `NEXT_PUBLIC_SITE_URL` remains unset. All requested functional/configuration checks and the production build pass; both audits report 0 vulnerabilities. TASK 018D remains product-unapproved and must not be merged before explicit visual approval.
- Owner-review refinement replaces the earlier abstract Looks symbol with a clearer long-sleeved maxi-dress silhouette and smaller sparkle. Home Favorites retain their 44px hit area while the visible circle is reduced to about 30px, the heart to 16px, and both sit closer to the upper-left image corner.
- The final owner-requested Favorite spacing pass reduces the visible control again to a 28px circle with a 14px heart; TASK 018E increases the clean inset from 4px to 6px while the 44px accessible hit target and persistence behavior remain unchanged.

## TASK 018E – Mobile Scale & Polish

- TASK 018E continues on the existing unmerged TASK 018D branch and updates Draft PR #20. The approved Home section order and visual concept remain unchanged, and nothing was merged into `main`.
- Mobile scale is now authoritative at 360–430px: Header and Search readability, gateway icon/label scale, Hero height and CTA, section headings, Brand circles, Rental banner hierarchy, and bottom navigation were increased without changing desktop sizing.
- Product and Look rails now show approximately 2.0–2.5 cards at the primary 390px viewport. Measured card widths are 135px at 360, 147px at 390, 152px at 400, and 152–156px at 430, with no page-level horizontal overflow.
- The reusable `LooksIcon` remains the single modest maxi-dress-and-sparkle asset used by both the Home gateway and bottom navigation.
- Home Favorite controls retain a 44px accessible hit target around a 28px backing circle and 14px heart. The visible control is inset 6px from the upper-left image edges so it remains compact without appearing attached to the card boundary.
- Public TASK 018E Preview: `https://foundher-h3cfz0504-found-her1.vercel.app`. Visual QA passed at 360, 390, 400, and 430px. The deployed 390×844 first viewport and continuous full-page Home were captured for owner review.
- Preview safety is unchanged: the response remains `noindex`, emits no canonical, blocks crawling in `robots.txt`, exposes an empty sitemap, and does not contain `foundher.example`.
- Favorites, fixtures, Search, link integrity, production configuration, TypeScript, lint, and the 34-route production build pass. Lint retains only the unchanged legacy `PageShell` `<img>` warning; both audits report 0 vulnerabilities.

## TASK 021 – Looks Functional Foundation

- `/looks` now provides compatible URL-based search and six working, Looks-only filters: All, Everyday, Work, Event, Vacation, and Shabbat. Search terms and an occasion filter compose, remain shareable on refresh, and require no new Client Component.
- The domain replaces duplicated ordered `productIds` with ordered `items`, where each entry references a Product and can select one original Product image. Repositories, fixture integrity, details queries, Home reuse, Favorites, and Similar Looks now consume the normalized shape.
- A reusable `LookProductCollage` composes two-to-five independent Product images. Cards link the composition to Look Details; the detail moodboard links every tile to its internal Product page and displays per-item price without claiming that the images form one photographed outfit.
- Five neutral demo Looks cover every primary filter. The new Vacation fixture combines a model-worn top source, a separate skirt source, standalone shoes, and standalone jewelry; its shoes and jewelry belong to the same neutral demo brand to validate multi-item brand relationships.
- Two project-local AI-generated demo product assets were created only for the missing standalone shoes and jewelry sources, then optimized as WebP. No combined outfit image, real brand, external commerce URL, or partner claim was introduced.
- Demo disclosures remain visible on Look cards/details and seller labels. Existing Favorites/localStorage behavior, Product/Look routes, commercial-link safeguards, Preview noindex/non-canonical rules, sitemap/robots policy, and security configuration are unchanged.
- Mobile QA covers 360, 390, 400, and 430px for the listing and 390px for Look Details, including RTL, active navigation, filtering, search submission, direct Product links, and absence of page-level horizontal overflow.
- `npm run test:looks` guards filter coverage, query composition, two-to-five item constraints, ordered resolution, Product route targets, category composition, and repeated-brand support.
- Public TASK 021 Preview: `https://foundher-24eu2bii5-found-her1.vercel.app`. Deployed QA passed for the unfiltered listing, Vacation filtering, Work plus search, Vacation Look Details, the new shoes Product page, and an invalid Look 404 with no runtime errors or horizontal overflow.
- Preview safety remains intact: responses include `X-Robots-Tag: noindex`, emit no canonical, `robots.txt` blocks crawling, and the sitemap is empty. `npm ci`, fixtures, Looks, Search, Favorites, links, production configuration, TypeScript, build, and both audits passed; lint retains only the unchanged legacy `PageShell` `<img>` warning.
- TASK 021 is implementation-complete but remains unmerged in Draft PR #21 pending owner review.

## TASK 022 – Looks Visual Polish

- TASK 022 keeps the approved TASK 021 search, filters, fixtures, routing, Favorites/localStorage behavior, Product links, demo disclosures, and SEO/deployment safeguards unchanged. It continues directly on the existing `codex/task-021-looks-foundation` branch and Draft PR #21.
- `/looks` now uses a mobile-first single-column editorial feed rather than a cramped two-column marketplace grid. At wider viewports it is contained to a centered two-column layout with a 1000px card area instead of stretching to three oversized columns.
- Look cards use two controlled alternating collage variants. Each gives the strongest source image about 61% of the composition and arranges the remaining one-to-four original Product images in a reusable complementary grid. No combined outfit photograph is generated or implied.
- Actual fixture prices appear as small, quiet labels on every visible collage tile. Browse-card copy is reduced to the occasion, title, up to two style descriptors, Product count, and a compact demo marker.
- Occasion accents are centralized and restrained: Shabbat uses dusty rose/wine, Work muted sage, Event mauve/plum, Everyday warm sand/caramel, and Vacation soft blue-gray.
- The page introduction, Search field, and occasion controls are more compact while retaining the same URL-based behavior and RTL horizontal scrolling.
- `/looks/[slug]` now opens with the same hierarchical source-image collage, a concise curation/trust statement, compact occasion treatment, and a clearer internal “לפריט” action on each Product card. Similar Looks use the editorial presentation only inside the Looks experience.
- Visual QA covers 360, 390, 400, and 430px mobile widths plus 1280px desktop containment. Listing and detail pages have no page-level horizontal overflow or console/runtime errors; visible source images retain their aspect ratios.
- Mixed-source fixture imagery still varies in lighting and editorial quality; owner-rejected sources are removed rather than retained as product imagery.
- Fixtures, Looks, Search, Favorites, links, production configuration, TypeScript, lint, production build, and both audits pass. Lint retains only the unchanged legacy `PageShell` `<img>` warning.
- TASK 022 public Preview: `https://foundher-ezq1h5l89-found-her1.vercel.app`. The deployed `/looks` page was verified at 390×844 with no visible broken images, page-level overflow, console/runtime errors, or canonical tag; its robots metadata remains `noindex, follow`. TASK 022 remains unmerged in Draft PR #21 pending visual review.
- TASK 022B tightens the approved Looks presentation without changing its logic. At 390×844 the title begins 24px below the compact application header, Search is 46px high, the filter rail is 46px high, and the first card begins at 280px. The card is 343px wide with a 257px moodboard, so the complete first Look and the start of the next Look are visible in the primary viewport.
- Browse moodboards now use a 61/39 dominant/secondary split. Four-item Looks stack three complementary sources beside the dominant garment; shoes and jewelry use contained fitting to preserve their silhouettes. Occasion badges moved onto the image and use the centralized category palette, while actual prices render at 11.5px in higher-contrast labels.
- The visible Favorite control is a restrained 28px cream circle with a 14px heart inside the unchanged 44px hit target. Browse metadata is limited to title, style, Product count, and a quiet demo marker. The 16px page inset and 28px inter-card rhythm are consistent throughout `/looks`.
- Visual QA passed at 360, 390, 400, and 430px with no page-level overflow or broken visible images. At 1280px, the existing centered two-column content remains capped at 500px per card rather than stretching across the viewport. TASK 022B remains part of Draft PR #21 and must not be merged before review.
- TASK 022B public Preview: `https://foundher-jyhow1r88-found-her1.vercel.app`. Deployed QA confirms the same 343×321px first card and 257px moodboard at 390×844, no visible broken images, no page-level overflow, no console/runtime errors, `noindex, follow`, and no canonical on both listing and detail routes.

## TASK 022C – Approved Looks Mobile Direction

- `/looks` removes the visible standalone “לוקים” heading and explanatory sentence. The FoundHer application header remains the visual anchor, followed only by the centered dusty-rose “השראה מפריטים אמיתיים” line, Search, filters, and the feed.
- The first card now begins at 224px in the 390×844 viewport, is 343×329px, and keeps the 257px 61/39 editorial moodboard. The next Look begins at 581px, so the first complete styling recommendation and the next card are visible within a natural first-screen scroll.
- Cards use a quiet warm-cream surface and add a calculated “החל מ־” summary derived from the lowest actual Product price. Occasion badges, tile prices, compact Favorites, and separate original source imagery retain the approved TASK 022B behavior.
- Demo order is intentionally varied: Shabbat, Work, Vacation, Event, and Everyday. Each of the first four Looks now combines an existing dominant garment with the existing standalone shoes and pearl earrings; Shabbat also includes the existing scarf, and Vacation retains its separate skirt source. No Product, business, external link, logo, or AI-combined outfit image was added.
- `test:looks` now guards the approved occasion order and verifies footwear plus jewelry in the first four Looks. Mobile QA passes at 360, 390, 400, and 430px with no page-level overflow, broken images, visible large H1, or console/runtime errors. Desktop remains a centered, contained two-column presentation at 1280px.
- TASK 022C public Preview: `https://foundher-bm6xr725m-found-her1.vercel.app`. Deployed 390×844 QA confirms no visible large H1, the first card at 224px, the next card at 581px, no broken images or page-level overflow, no console/runtime errors, `noindex, follow`, and no canonical on both listing and detail routes. TASK 022C remains on Draft PR #21 and must not be merged before visual approval.

## TASK 022D – Final Looks Feed Polish

- The approved LookCard structure and all Look/search/filter/Favorites behavior remain unchanged. At 390px the card stays 343px wide while its moodboard grows from 257px to 286px; total height grows from 329px to 354px. The first card still begins at 224px and the next begins at 606px.
- At 430px the moodboard is capped at 305px to avoid an oversized card. At desktop widths the mobile enlargement is removed: 1280px remains a centered two-column layout with 500px cards and 375px moodboards.
- Title size remains 17px semibold. Descriptor, Product count, quiet demo label, and calculated starting price now share one wrapping 12.8px metadata row with reduced vertical padding, keeping the starting price visually attached to the Look rather than isolated.
- Favorite styling remains the approved 28px cream circle and 14px heart inside a 44px hit target. Occasion badges and per-tile price labels are unchanged. Unselected filters now use stronger 75% foreground text, a warmer visible border, and an off-white surface so they remain clearly available.
- Local visual QA passes at 360, 390, 400, and 430px with no page-level overflow, broken imagery, or console/runtime errors. Fixtures, Looks, Search, Favorites, links, production configuration, TypeScript, lint, and production build pass; lint retains only the unrelated legacy `PageShell` `<img>` warning.
- TASK 022D public Preview: `https://foundher-583rwpwfz-found-her1.vercel.app`. Deployed 390×844 QA confirms the final 343×354px card, 286px moodboard, next card at 606px, no broken images or page-level overflow, no console/runtime errors, `noindex, follow`, and no canonical. TASK 022D remains on Draft PR #21 and must not be merged before visual approval.
- Owner-requested content cleanup removes the rejected lower-left source image from the first Shabbat Look and from the complete fixture system. The associated demo scarf Product and now-empty headscarf Category were removed; Brand B's temporary fixture image now reuses its existing pleated-dress source. The first Look remains a complete three-item styling recommendation with dress, shoes, and pearl earrings. Updated public Preview: `https://foundher-169rb5e9m-found-her1.vercel.app`.
- Owner-requested content cleanup removes the two rejected woman photos and their demo Products from the entire fixture system. The Vacation Look keeps a complete dress, shoes, and pearl-earrings composition; affected Home occasions, Brand imagery, Category imagery, and Looks tests no longer reference the rejected assets. The visual layout and interaction behavior are unchanged.
- A subsequent image-quality pass also removes the rejected woman photo from “ערב רומנטי”. New project-local, product-only images now provide a sage modest maxi dress for Vacation and a muted-mauve modest evening gown for Evening; neither image contains a model or fabricated combined outfit. All five Looks retain complete garment, footwear, and jewelry compositions with no missing image references.
- Three additional Everyday demo Looks add navy, warm-neutral, and dusty-rose directions. Each uses a new project-local, product-only modest garment image plus the existing shoes and pearl earrings, keeping the approved moodboard presentation and avoiding generated people or combined-outfit photography. Updated public Preview: `https://foundher-aotvsbh9k-found-her1.vercel.app`.
- Owner feedback refines the Everyday direction: the warm-neutral set is replaced by a practical long denim skirt and separate black modest blouse. The Look remains a four-source moodboard with shoes and pearl earrings; no model or combined-outfit image is used.
