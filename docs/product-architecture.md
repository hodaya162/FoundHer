# FoundHer Product Architecture

## FoundHer Product Promise

FoundHer helps modest women decide what to wear by discovering complete looks and the products that create them.

The platform is inspiration-first. A user should choose a look she connects with before she needs to decide whether its individual items are available for purchase or rental.

## Product Principles

- Complete looks are the primary discovery unit.
- Products support an inspiration journey; they are not the product's main organizing idea.
- Purchase and rental items may coexist inside one look.
- Product type is defined only by the existing `Product` discriminated union. Duplicate flags such as `isRental` are not allowed.
- Rental discovery begins with dresses, not a directory of rental businesses.
- Brands and rental businesses provide trust, context, and deeper exploration after an item or look has created interest.

## Primary User Journey

```text
Home
→ Occasion or inspiration
→ Look
→ Product
→ Brand website or rental availability
```

## Secondary User Journeys

```text
Rentals
→ Rental dress
→ Availability
```

```text
Brand
→ Products and looks
→ Product
```

```text
Search
→ Looks, products, brands and rentals
```

Search is implemented as a dedicated, unified MVP route. It complements the inspiration-first journeys without replacing Home, Looks, or Rentals.

```text
Any Look, Product, Rental or Brand card
→ Save with the shared FavoriteButton
→ Favorites
→ Return to the original Look or Product journey
```

Favorites are an MVP personal collection. They preserve stable entity references only; they do not duplicate repository data or change the Product type model.

## Favorites Architecture

- A favorite reference contains only `entityType` (`look`, `product`, or `brand`) and a stable `entityId`.
- Rental dresses use the `product` favorite entity. Their placement in the Rentals category is derived from the existing Product discriminated union, never from a duplicated `isRental` flag.
- `FavoriteButton` is the shared interactive primitive. Existing Look and Product wrappers retain entity-specific placement while delegating state, accessibility, and persistence to the shared component.
- Cards and detail pages remain server rendered. `FavoriteButton` and the interactive collection on `/favorites` are the only Favorites client islands.
- The browser storage adapter owns safe parsing, validation, deduplication, serialization, and unavailable-storage behavior. UI components never call `localStorage` directly.
- The service exposes `getFavorites`, `isFavorite`, `addFavorite`, `removeFavorite`, `toggleFavorite`, and subscription behavior. Same-page instances synchronize through the service, while browser tabs synchronize through the native `storage` event.
- `/favorites` receives current Look, Product, Rental, and Brand data from repository-backed server composition, then resolves locally saved references inside its focused client island.
- Brand references can be saved from curated Home cards and Search. Saved Brands remain non-linking until dynamic Brand routes exist.

Local browser persistence is an MVP implementation, not the final multi-device solution. A future authenticated implementation can replace `LocalFavoritesStorage` with a Supabase-backed adapter while preserving the reference model and shared UI contract. Server-side user favorites can then be resolved through repositories before rendering, reducing the `/favorites` client boundary further.

## Screen Responsibilities

### Home

Home helps a user decide where to begin. It should surface occasion entry points, featured looks, trending inspiration, selected rentals, new brands, and seasonal editorial content.

Home must not become a complete product catalog or duplicate the full Looks feed.

### Looks

Looks is the primary inspiration feed. Each card represents a complete outfit or styling idea with a strong visual, scenario, short story, occasions, style, season, and a route to look details.

Looks must not use `ProductCard` as its primary visual or collapse into a generic product grid.

Implemented hierarchy:

```text
/looks
→ Page header and editorial introduction
→ LookGrid
→ LookCard (cover, limited context, story excerpt, product count, visual save action)
```

### Look Details

A look detail page tells the styling story, presents the complete visual, and resolves its linked products and brands. Products must preserve the editorial order defined by `productIds`. Purchase and rental products may appear together.

Look details must not duplicate product entities or replace their dedicated detail pages.

Implemented hierarchy:

```text
/looks/[slug]
→ Breadcrumbs
→ Hero image and Look header
→ Story
→ Ordered product list
→ Similar Looks
```

Look products resolve through repositories in `productIds` order. Missing products are omitted without breaking the Look, while purchase brands and rental businesses degrade to clear fallback labels when an association is unavailable.

Similar Looks uses a deterministic score: shared occasion has the highest weight, followed by shared style and shared season. The current Look is excluded, fixture order breaks ties, and at most three results are returned.

### Product Details

Product details support the look journey with images, product type, price, seller or rental business, sizes, metadata, and a safe external purchase or availability action.

Product details must not become a disconnected discovery feed. The existing typed Product Feature remains the source of truth.

### Rentals

Rentals is a dress-first discovery feed containing evening and bridal rental products. It should provide clear product type labels and lead directly to rental product pages.

Rentals must not begin as a rental-business directory. Rental businesses appear on product pages, in “more from this business,” and optionally in secondary discovery sections.

### Rental Business

A rental-business page supplies trust and context: story, location, contact options, and more dresses from the same business.

Rental business pages must not replace the main rental dress feed.

### Brands

Brands allows focused exploration of a brand's story, products, and looks that include the brand.

Brands must not replace global inspiration discovery or become the only path to a product.

### Favorites

Favorites will eventually organize saved looks, products, rental dresses, and brands.

Favorites must not imply persistence until authentication and storage are implemented.

### Profile

Profile will eventually support personalization such as sizes, preferred styles, colors, occasions, and brands.

Profile must not collect or promise personal data handling before authentication, persistence, and privacy decisions are implemented.

## Look Domain Model

`Look` is a first-class domain entity with:

- stable `id` and `slug`
- editorial `title`, `description`, and `story`
- `coverImage`
- ordered `productIds`
- linked `brandIds`
- typed `occasions`, `styleTags`, and `seasonTags`
- `featured` and `createdAt`

Identifiers use stable English values such as `wedding_guest`, `elegant`, and `all_season`. Hebrew labels belong in presentation code, not domain identifiers.

Looks reference products by ID and never embed or duplicate product records. `getProductsByIds` resolves known products in the order supplied by the look.

## Mixed Purchase and Rental Looks

A look may contain purchase products, rental products, or both. The product's `type` determines its behavior and presentation after resolution.

The `modern-evening-romance` fixture proves the mixed model by combining the rental dress `rental-modern-romance-dress` with purchase footwear and jewelry.

Not every look is required to mix commerce types.

## Rental Discovery Architecture

The implemented `/rentals` feed consumes focused repository helpers:

- `getEveningRentalProducts()`
- `getBridalRentalProducts()`
- `getFeaturedRentalProducts()`
- `getRentalProductsByCity(city)`

The intended flow is:

```text
Rental feed
→ Rental product
→ Availability action and rental business context
→ More products from the same business
```

The top-level evening/bridal selection is implemented through server-rendered URL query parameters and typed repository helpers, without client state. City, size, price, and style controls are explicitly disabled future architecture; they do not pretend to filter results. City remains a simple fixture-backed query for future result use, while advanced filtering remains out of scope.

## Implemented Rentals Experience

TASK 009 implements the dress-first flow without turning rental businesses into the landing-page hierarchy:

```text
/rentals
-> evening or bridal rental dress
-> /products/[slug]
-> external availability action
-> /rental-businesses/[slug]
-> more dresses from the same business
```

- `/rentals` is a Server Component backed by rental product repositories. It never imports fixtures or depends on the legacy `PageShell`.
- Rental cards prioritize the dress image, textual rental type, rental price, city, business, and a link to the existing dynamic Product route.
- Evening and bridal filters use stable typed product values. Unknown query values safely fall back to all rentals.
- Rental product pages keep the dress and availability action primary. Business name, city, description, and route are secondary context.
- `getOtherRentalProductsByBusinessId` excludes the current product, preserves fixture order, and applies a bounded result limit.
- `/rental-businesses/[slug]` resolves through repositories, generates stable metadata and static params, returns `notFound()` for unknown slugs, and keeps its dress collection visually dominant.
- Business contact actions render only when data exists and open external WhatsApp, Instagram, or website destinations safely.
- Missing business relationships degrade to explicit fallback copy instead of crashing. Fixture validation currently guarantees that all configured relationships resolve.
- All Rentals presentation remains server-rendered. TASK 009 introduces no Client Components, filter library, state manager, availability system, or persistence.

## Product Presentation Rules

Every product shown inside a look or feed must visibly expose:

- purchase or rental state
- price
- a textual product type label

Recommended Hebrew labels:

| Product type | Label |
| --- | --- |
| `purchase` | לרכישה |
| generic rental context | להשכרה |
| `rental_evening` | השכרת ערב |
| `rental_bridal` | השכרת כלה |

Color may reinforce state but must never be the only signal.

## Home Editorial Architecture

The root `/` route is FoundHer's editorial entry point. It answers “what should I wear?” by directing the user into the most relevant journey rather than reproducing a catalog.

The implemented hierarchy is intentional:

```text
Primary question and Looks CTA
-> occasion entry points
-> featured Looks
-> featured rental dresses
-> selected brands
-> selected purchase products
-> editorial Looks CTA
```

- Home is curated, limited, directional, and mixes content types. It never renders a complete domain feed.
- Looks remains the full inspiration feed and appears before every commerce-oriented section.
- Rentals remains the full dress-first rental destination; Home shows only three featured rental dresses.
- Products remain supporting items; Home shows at most four featured purchase products and does not recreate Discover.
- Brands remain secondary. Because dynamic Brand Details are not implemented, Home presents brands editorially and provides one honest route to `/brands` rather than fake per-brand links.
- All eight occasion entries use existing typed `LookOccasion` values. They currently link safely to `/looks` because occasion filtering is not implemented; their typed architecture is ready for a future query-param experience.
- Home composes Looks, Rentals, Brands, and Products through their existing repositories and presentation features. It has no fixture imports and no generic Home repository.
- The Hero is the only new above-the-fold priority image. Occasion and content images use responsive `next/image` without unnecessary priority loading.
- Empty curated collections are omitted instead of filling the editorial page with repeated empty-state boxes.
- TASK 010 introduces no Client Components, carousel, search UI, state manager, authentication, persistence, or remote data access.

## Navigation Direction

Recommended future mobile navigation:

```text
בית
לוקים
השכרות
שמורים
פרופיל
```

Rentals is a primary mobile destination. It also remains reachable through Home entry points, future search, look product badges, and the direct `/rentals` route.

Brands is a secondary entity and must not appear in primary mobile navigation. Users reach brands through Product pages, Look pages, curated Home sections, future search, and “more from this brand” links.

TASK 008 applies this direction through the centralized `config/navigation.ts`: mobile navigation is Home, Looks, Rentals, Favorites, and Profile; desktop additionally exposes Brands. Discover is absent from primary navigation but its route remains available directly.

## Route Map

Primary planned routes:

```text
/
/looks
/looks/[slug]
/products/[slug]
/rentals
/brands
/brands/[slug]
/rental-businesses/[slug]
/favorites
/profile
```

Result routes:

```text
/search
/categories/[slug]
/products
```

`/search` is implemented. The category and product index routes remain future options and no placeholder dynamic routes are created.

## Unified Search Architecture

`/search?q=...` is the canonical Search experience. The URL owns query state, so results are server rendered, shareable, refresh-safe, and usable without a Client Component or state library.

Search composes existing repositories in `features/search/queries/search-foundher.ts`; routes and components never import fixtures. Results are grouped in this fixed order:

1. Looks
2. Purchase products
3. Rental products
4. Brands
5. Rental businesses

Searchable fields are explicit and exclude technical identifiers and slugs:

- Looks: title, description, story, occasion/style/season labels, and linked Brand names
- Products: name, description, category, colors, sizes, commerce intent, and Brand name
- Rental products: name, description, category, sizes, rental type, city, and rental-business name
- Brands: name and description
- Rental businesses: name, description, city, and rental intent

Matching normalizes Unicode with NFKC, lowercases text, removes punctuation, and collapses whitespace. Scoring is deterministic: exact full-title matches rank highest, followed by title-prefix and title-contains matches, then per-term matches in title, tags, relationships, and descriptions. Multiword queries require at least two distinct terms to match; single-word queries require one. Score ties preserve repository order.

Results use entity-specific presentation and real detail URLs. Brands remain honest non-links because `/brands/[slug]` is not implemented; rental businesses link to their existing routes. Query variants are `noindex, follow` to avoid indexing thin search-result pages. Search intentionally omits match highlighting because safe, readable RTL highlighting is not required for the MVP.

The shell Search action and a small Home Hero entry point lead to `/search`. Search is not added to primary mobile navigation; the compact mobile Header exposes Search without changing the approved five-item bottom navigation. A future Supabase migration should replace only the query implementation while preserving result types, grouping, URL behavior, and presentation components.

## `/discover` Migration Plan

`/discover` is transitional and is not part of primary navigation. The new Looks feed and Look Details experience are complete, but `/discover` remains operational by direct URL until reusable product-result behavior has an approved destination.

Recommended migration:

1. Keep `/discover` working as a direct transitional route.
2. Use the implemented `/looks` and `/looks/[slug]` routes as the primary discovery surfaces.
3. Keep unified cross-entity search in `/search`; move category-only or full product-index behavior to `/categories/[slug]` or `/products` only when approved.
4. Redirect `/discover` to `/looks` only after navigation, links, metadata, and saved URLs have an approved migration path.

This avoids destructive route removal and preserves the existing Product Feature.

## Deferred Capabilities

- advanced filtering, user-controlled sorting, pagination, and autocomplete
- favorites persistence
- authentication and profile personalization
- Supabase and remote data
- dynamic brand pages

## Decisions Required Before the Next Task

- Decide whether TASK 012 should prioritize Favorites persistence or dynamic Brand Details.
- Decide when dynamic Brand Details should replace the transitional `/brands` destination.
- Confirm that `/discover` should ultimately redirect to `/looks` after product-result routes have been separated.
