# FoundHer MVP Readiness Audit

## Executive Summary

**Status: not ready for a public release yet, but the core curated MVP is functionally complete.**

FoundHer already supports the complete discovery loop across Home, Looks, Products, Rentals, Search, and browser-local Favorites. The application builds successfully, its repository-backed routes work, and its modern surfaces have strong responsive, RTL, and accessibility foundations.

The remaining work is launch hardening rather than a new product system. The public release is blocked by demo commerce destinations, fictional contact details, visible legacy experiences, a placeholder production URL, and high-severity advisories affecting the installed Next.js version. Supabase and authentication are not required to resolve these blockers or launch the first curated MVP.

## Audit Scope and Evidence

This audit reviewed the application shell, navigation, public routes, repository and fixture data, metadata, client boundaries, local persistence, legacy surfaces, deployment files, documentation, and dependency tree. Existing browser QA recorded in `docs/progress.md` was cross-checked with focused inspection of Home, Discover, Brands, Profile, Product, and Rental flows.

The following commands were run on `codex/task-013-mvp-readiness` after TASK 012 was merged into `main`:

| Check | Result |
| --- | --- |
| `npm run validate:fixtures` | Pass: 8 purchase products, 6 rentals, 4 looks, 4 brands, 2 rental businesses, and 6 categories |
| `npm run test:search` | Pass |
| `npm run test:favorites` | Pass |
| `npm run lint` | Pass with one pre-existing `@next/next/no-img-element` warning in `app/ui/page-shell.tsx` |
| `npm run typecheck` | Pass |
| `npm run build` | Pass; 32 pages generated |
| `npm audit` | 7 vulnerabilities: 6 high, 1 low, 0 critical, 0 moderate |

No automatic dependency fixes were run.

## Prioritized Findings

| Priority | Issue | Affected file or area | Why it matters | Recommended action | Estimated effort |
| --- | --- | --- | --- | --- | --- |
| P0 | Purchase and rental conversion links are demo destinations | `data/fixtures`, Product and Rental action bars | Purchase links use `example.com`; rental availability and social links include placeholder domains or fixture phone numbers. Users cannot complete the product's central journey safely. | Replace every public seller, availability, contact, and social URL with verified partner-owned destinations. Hide any item whose destination cannot be verified. | M, 1–3 days plus partner coordination |
| P0 | Public content still identifies fictional/demo entities | Brand and rental-business fixtures; product relationships | A public marketplace-like experience must not imply that fictional sellers are real businesses. | Replace demo entities with approved real partners and verified copy, or label the entire release clearly as a private demo. | M, 1–3 days plus approvals |
| P0 | Legacy Brands and Profile experiences are visible | `/brands`, `/profile`, `config/navigation.ts`, Home Brand CTA, `app/ui/page-shell.tsx` | Brands shows hardcoded product-like cards and fake controls; Profile promises account behavior that does not exist. Both create misleading, broken journeys. | Remove Brands and Profile from public navigation for MVP; remove the Home link to the legacy Brands directory; redirect or return 404/noindex for these routes until real experiences exist. Keep embedded brand references in working Looks, Products, Home, and Search. | S, 2–4 hours |
| P0 | Installed Next.js version has high-severity advisories | `package.json`, lockfile, Next.js runtime | `next@16.2.6` is directly affected by high-severity advisories reported by the current dependency audit. This should not ship publicly when a compatible patched version is available. | Upgrade Next.js in a focused dependency task, review release compatibility, rerun every validation command, and confirm the resulting audit. Do not use a blind force fix. | S–M, 2–4 hours |
| P0 | Canonical production origin is a placeholder | `app/layout.tsx` and route metadata | Canonicals resolve to `https://foundher.example`, which would publish incorrect SEO identity and sharing URLs. | Centralize the site origin through validated production configuration and replace all placeholder canonicals before indexing or production release. | S, 1–2 hours |
| P1 | Transitional Discover exposes inert filters and is indexable | `/discover`, product discovery components, Home “more products” link | The grid is useful, but its filter buttons do nothing and its canonical advertises a transitional page as a durable search surface. | Keep it temporarily accessible because it is the only all-products feed; remove/hide inert controls, apply `noindex`, keep it out of primary navigation, and later redirect it only when an equivalent product/category route exists. | S, 2–4 hours |
| P1 | Some visible actions and copy describe unavailable behavior | Product Share action, Home future-feature copy, legacy controls | Non-functional actions reduce trust even when the primary journey works. | Remove or implement the Share action; remove future-facing filler copy and any remaining clickable-looking controls without behavior. | S, 1–3 hours |
| P1 | Image set is repetitive and brand logos are temporary | `public/images/products`, fixture image and logo fields | Fifteen filenames resolve to only six unique image files; temporary logos reuse fashion photos. This makes the public catalog look artificial and weakens seller identity. | Replace duplicates with licensed, entity-specific modest-fashion imagery and approved logos; preserve meaningful alt text and dimensions. | M, 1–3 days |
| P1 | Minimum crawl controls are missing | App Router metadata routes | No sitemap or robots endpoint exists, while transitional and private utility surfaces need deliberate indexing rules. | Add `sitemap.ts` and `robots.ts`; include only canonical public routes and exclude Search, Favorites, Design System, transitional Discover, and hidden legacy routes. | S, 2–4 hours |
| P1 | Launch documentation is stale | `README.md`, `docs/progress.md` | README still describes Discover as the first migrated feature and omits newer validation commands, which makes deployment and handoff error-prone. | Update architecture, commands, local setup, deployment expectations, browser-only Favorites limitation, and current public routes. | S, 1–2 hours |
| P1 | No automated content/link gate exists | Validation scripts and fixture data | Type safety cannot detect `example.com`, fake WhatsApp numbers, temporary logos, or unverified outbound destinations. | Add a small deterministic content-readiness test that rejects known placeholder hosts/numbers and checks required image files and entity references. | S, 2–4 hours |
| P1 | No production route smoke test exists | Build/release workflow | Current focused tests validate data logic but do not prove that essential built routes answer successfully and redirects/404s behave in a production server. | Add a lightweight smoke script for Home, Looks, Look detail, Product detail, Rentals, Rental Business, Search, Favorites, redirects, and an unknown slug. Avoid introducing a large test framework. | M, 0.5–1 day |
| P1 | Preview deployment has not received release QA | Vercel preview and production configuration | Local build success does not verify deployment headers, canonical origin, real outbound links, mobile LCP, or production routing. | Deploy a preview after P0 fixes; run route smoke, mobile/desktop journey QA, Lighthouse, metadata checks, and outbound-link verification before promoting `main`. | S, 2–4 hours |
| P1 | Baseline response security policy is not configured | `next.config.ts` or hosting configuration | The current static, no-account MVP has a small attack surface, but baseline headers reduce common browser risks and make future integrations safer. | Add and verify a focused set of headers appropriate to the actual external image/link policy; introduce CSP only after verifying it does not break Next.js. | S, 2–4 hours |
| P2 | Legacy PageShell, old CSS, and compatibility routes remain | `app/ui/page-shell.tsx`, legacy stylesheet, `/product` | They produce a lint warning and maintenance noise, but are not launch blockers once legacy routes are removed from public reach. | Retire them incrementally after launch-facing routes no longer depend on them; then remove the compatibility redirect if analytics show it is unused. | M, 0.5–1 day |
| P2 | Favorites page hydrates a repository-backed collection | `features/favorites` | It is acceptable for the small current dataset, but larger catalogs may make client composition heavier. | Measure the production bundle and dataset growth before optimizing; preserve the storage adapter boundary. | M, only if measurement justifies it |
| P2 | Design System is deployed as a route | `/design-system` | It is correctly noindexed, but a public production build does not need to expose internal component documentation. | Keep noindex or disable the route in production when convenient. | S, under 1 hour |
| P2 | Privacy/release policy is minimal | Footer and launch copy | The current app collects no account or backend data, so consent infrastructure is not required. Users should still understand that Favorites stay in their browser. | Add concise browser-storage and privacy language; reassess before adding analytics, accounts, or third-party tracking. | S, 1–2 hours |
| P3 | Cloud persistence and accounts are absent | Future data/auth layer | Multi-device Favorites and user profiles are valuable but not necessary to validate the curated discovery and outbound-conversion proposition. | Add Supabase and authentication only after the public MVP proves demand and requirements are defined. | L, future initiative |
| P3 | Dynamic Brand experiences, advanced filters, booking, and live availability are absent | Future product modules | These expand the product but are not needed for the first useful public release if incomplete entry points remain hidden. | Prioritize using real usage evidence after launch. | L, future roadmap |

## Product Journey Assessment

| Journey | Readiness | Finding |
| --- | --- | --- |
| Land on Home | Ready after content cleanup | Clear editorial hierarchy, responsive RTL layout, and real links into core domains. Remove future-feature copy and the legacy Brands CTA. |
| Discover and open a Look | Ready | Repository-backed feed and dynamic details work, including ordered products and similar Looks. |
| Open a Product | Ready | Dynamic Product routes, metadata, galleries, and purchase/rental variants work. |
| Leave for the original brand | Blocked | Current outbound purchase URLs are placeholders. |
| Discover a rental | Ready | Rental feed, real type filters, Product routes, and Rental Business routes work. |
| Check rental availability | Blocked | Availability destinations and contact details are fixtures/placeholders. |
| Search | Ready for MVP | Deterministic unified search works without a search service; noindex behavior is appropriate. |
| Save and return to Favorites | Ready for one browser | Persistence, synchronization, defensive parsing, and entity grouping work. It is not account-based or multi-device. |

## Navigation Decision

- Keep the public primary navigation focused on **Home, Looks, Rentals, Favorites**, plus Search entry points.
- Hide **Profile** until authentication and a real profile experience exist. Do not expose a button that promises account creation.
- Hide the legacy **Brands directory**. Brands may still appear contextually in Home, Looks, Products, Search, and future “more from this brand” links.
- Keep `/discover` temporarily as a direct, noindex all-products feed after its inert controls are removed. Do not place it in primary navigation. Redirect it only when the replacement route provides equivalent results.

## Legacy Code Decision

### Must be removed from public reach before MVP

- Legacy `/brands` and `/profile` navigation and calls to action.
- Fake filters, fake favorite/share/account controls, and misleading copy on any public route.
- Any legacy route that presents unrelated hardcoded cards as real data.

### Safe to retain internally until after MVP

- `PageShell`, its old CSS, and its `<img>` warning, provided no public launch route depends on it.
- The `/product` compatibility redirect, until usage is reviewed.
- Transitional Discover composition, provided it is honest, noindexed, and outside primary navigation.

## SEO Minimum for Launch

The modern public routes already have a good base: route-level metadata exists for major feeds and dynamic pages, unknown dynamic slugs return 404, Open Graph/Twitter data is available on key surfaces, and Search/Favorites/Design System are noindexed appropriately.

Before launch:

1. Replace `foundher.example` with the verified production origin everywhere.
2. Add robots and sitemap metadata routes with an explicit public-route allowlist.
3. Noindex transitional Discover and any temporarily reachable legacy surface.
4. Verify canonical, title, description, Open Graph image, and 404 behavior on the deployed origin.
5. Keep Search and Favorites out of the sitemap and noindexed.

## Accessibility Assessment

No launch-blocking issue was found on the implemented Home, Looks, Products, Rentals, Search, or Favorites experiences. Recorded browser QA confirms RTL structure, heading hierarchy, meaningful image alternatives, focus visibility, keyboard navigation, 44px targets, active navigation semantics, and no nested interactive controls. Current primary and muted text tokens meet WCAG AA contrast for normal text against their configured light backgrounds.

The visible legacy Brands surface does contain invalid nested interactive behavior and fake controls. Hiding that surface is therefore part of the P0 public-surface correction. A short keyboard and screen-reader smoke pass should be repeated on the preview deployment after the launch changes.

## Performance Assessment

- The application uses Server Components for the main content paths and limits client code primarily to route-active navigation and Favorites behavior.
- Most imagery uses `next/image`; the remaining plain `<img>` is isolated to legacy `PageShell`.
- Static generation covers most content routes, while Search and Rentals use appropriate request-time behavior.
- No large state library or unnecessary client-wide provider is present.
- Duplicate imagery is primarily a content-quality problem because optimized local assets can be cached, but unique licensed assets should still be checked for dimensions and compression.

No current performance issue alone blocks MVP. Measure mobile LCP, CLS, image transfer, and JavaScript on the preview deployment before production rather than adding speculative optimization work.

## Security, Privacy, and Dependency Assessment

- No tracked `.env` files, exposed API keys, or likely secrets were found.
- No authentication, backend, cookies, or user-profile data collection exists.
- Favorites stores only stable entity type/ID references in localStorage. This is low sensitivity and acceptable for MVP.
- External links that open a new tab use `noopener noreferrer`.
- Users must be told that Favorites are browser-local and may disappear when browser storage is cleared.

`npm audit` reported 7 vulnerabilities:

| Severity | Count | Packages/area | MVP decision |
| --- | ---: | --- | --- |
| Critical | 0 | None | No blocker |
| High | 6 | Direct `next@16.2.6`; transitive `postcss`, `sharp`, `brace-expansion`, `js-yaml`, and `nanoid` | The direct Next.js runtime finding blocks public launch. Upgrade Next.js to the compatible patched release and re-audit. Review remaining transitive findings by runtime exposure after the upgrade; do not force resolutions blindly. |
| Moderate | 0 | None | No blocker |
| Low | 1 | Transitive `@babel/core` | Does not independently block MVP; update through normal supported parent dependency upgrades. |

## Smallest Additional Test Set

1. **Content readiness test:** fail on known placeholder domains/numbers, missing fixture images, invalid public destinations, duplicate stable IDs, and unresolved relationships.
2. **Production route smoke:** start the built app and verify essential routes, one representative dynamic route per entity type, redirects, and unknown-slug 404 behavior.
3. **Manual preview release pass:** one mobile and one desktop pass through Home → Look → Product → outbound destination, Rentals → availability, Search, Favorites refresh, keyboard focus, and metadata. Keep this as a concise release checklist until repeated regressions justify a full end-to-end framework.

## Deployment Readiness and Exact Steps

The repository is structurally suitable for Vercel: it is a standard Next.js App Router project, requires no runtime environment variable today, declares a supported Node engine, and produces a successful production build. No custom `vercel.json` is required for the current architecture.

1. Complete the P0 public-content, legacy-surface, Next.js upgrade, and production-origin work in focused reviewed PRs.
2. Add the P1 SEO metadata routes and lightweight release tests.
3. Update README with current setup, all validation commands, supported routes, and Favorites limitations.
4. Merge approved launch-preparation PRs into `main`; confirm the tree is clean and run the full validation suite plus `npm audit`.
5. Import the GitHub repository into Vercel, use the Next.js preset, Node 22.x, and `npm run build`. Add a production site URL variable only if the approved implementation centralizes origin configuration that way.
6. Create a preview deployment. Run the production route smoke, responsive journey QA, outbound destination checks, Lighthouse, canonical/robots/sitemap checks, and a short keyboard/screen-reader smoke.
7. Connect the production domain and ensure the configured site origin exactly matches it.
8. Deploy the reviewed `main` branch to production.
9. Recheck 404s, canonicals, Open Graph previews, robots/sitemap, all commerce/contact destinations, and Favorites disclosure on the live origin.

## Direct Product Decisions

1. **MVP launch blockers:** placeholder commerce/contact URLs, fictional public entities, visible legacy Brands/Profile experiences, the placeholder canonical origin, and the direct high-severity Next.js advisories.
2. **Must fix before launch:** all P0 items plus the P1 honesty/Discover cleanup, licensed unique imagery, crawl controls, release documentation, content gate, production smoke, and preview QA.
3. **Safe to defer:** internal legacy code cleanup, client optimization without measurement, hiding the noindexed Design System route, cloud Favorites, accounts, dynamic Brand pages, advanced filters, booking, and live availability.
4. **Supabase required?** No. The first MVP can be a curated, repository-backed public experience with verified outbound conversion links.
5. **Authentication required?** No. Hide Profile and do not promise account behavior. Authentication is needed only when multi-device or user-owned functionality becomes an approved requirement.
6. **Are localStorage Favorites acceptable?** Yes, for MVP, because they store non-sensitive stable references and work reliably in one browser. The UI/documentation must disclose that they are not synced and can be cleared with browser data.
7. **What should happen to `/discover`?** Keep it temporarily, remove inert controls, mark it noindex, and leave it outside primary navigation. Redirect only after an equivalent dedicated product discovery route exists.
8. **Should Brands/Profile remain visible?** No. Hide both legacy destinations before public launch. Continue showing brands contextually within working content.

## Recommended Next Three Tasks

1. **TASK 014 – Public Surface and Content Integrity:** replace verified commerce/contact/entity data, hide Brands/Profile legacy entry points, remove fake actions/copy, and decide which incomplete records must remain unpublished.
2. **TASK 015 – Dependency Security Baseline:** upgrade Next.js to the supported patched release, resolve compatible transitive updates, add appropriate baseline headers, and rerun the full validation/audit suite.
3. **TASK 016 – SEO and Deployment Readiness:** centralize the real production origin, add sitemap/robots/indexing policy, clean up transitional Discover, add the two lightweight release tests, update README, and validate a Vercel preview.

## Exact Launch Checklist

### Content and product integrity

- [ ] Every public Product has an approved image, seller, price, and verified outbound destination.
- [ ] Every Rental has a verified availability/contact destination and real rental-business relationship.
- [ ] No `example.com`, fixture phone number, temporary logo, fictional public seller, or placeholder copy remains.
- [ ] Duplicate images are replaced or intentionally approved with documented usage rights.
- [ ] All visible controls perform the action their label promises.
- [ ] Brands and Profile legacy entry points are hidden; incomplete routes are redirected, noindexed, or unavailable.
- [ ] Favorites clearly state that they are stored only in the current browser.

### Engineering and security

- [ ] Next.js is upgraded to a compatible patched release.
- [ ] `npm audit` is reviewed again with no unresolved launch-blocking runtime advisory.
- [ ] `npm run validate:fixtures` passes.
- [ ] `npm run test:search` passes.
- [ ] `npm run test:favorites` passes.
- [ ] Content-readiness test passes.
- [ ] Production route smoke passes.
- [ ] `npm run lint`, `npm run typecheck`, and `npm run build` pass.
- [ ] No secrets or environment files are committed.

### SEO, accessibility, and performance

- [ ] Production origin and every canonical use the live domain.
- [ ] Robots and sitemap expose only approved public routes.
- [ ] Search, Favorites, Design System, transitional Discover, and hidden legacy routes have the intended indexing policy.
- [ ] Deployed titles, descriptions, Open Graph data, and unknown-route 404s are verified.
- [ ] Mobile and desktop keyboard/focus/RTL/touch-target smoke passes on preview.
- [ ] Preview Lighthouse review finds no unexplained launch-blocking accessibility or performance regression.
- [ ] Key images load without layout shift and have meaningful alt text.

### Deployment and release

- [ ] README reflects the real architecture, commands, routes, limitations, and deployment procedure.
- [ ] All launch-preparation PRs are reviewed and merged into a clean `main`.
- [ ] Vercel preview uses Node 22.x and completes the production build.
- [ ] Home → Look → Product → seller journey works on preview.
- [ ] Rentals → Product → availability journey works on preview.
- [ ] Search and Favorites refresh journey works on preview.
- [ ] All outbound seller/contact/social links are manually verified.
- [ ] Production domain is connected and matches site-origin configuration.
- [ ] Production deploy is made from reviewed `main` and receives a final live smoke test.
