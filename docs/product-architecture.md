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

Search is future scope and is not implemented yet.

## Screen Responsibilities

### Home

Home helps a user decide where to begin. It should surface occasion entry points, featured looks, trending inspiration, selected rentals, new brands, and seasonal editorial content.

Home must not become a complete product catalog or duplicate the full Looks feed.

### Looks

Looks is the primary inspiration feed. Each card represents a complete outfit or styling idea with a strong visual, scenario, short story, occasions, style, season, and a route to look details.

Looks must not use `ProductCard` as its primary visual or collapse into a generic product grid.

### Look Details

A look detail page tells the styling story, presents the complete visual, and resolves its linked products and brands. Products must preserve the editorial order defined by `productIds`. Purchase and rental products may appear together.

Look details must not duplicate product entities or replace their dedicated detail pages.

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

The `modern-evening-romance` fixture proves the mixed model by combining the rental dress `rental-modern-romance-dress` with the purchase item `product-satin-headscarf`.

Not every look is required to mix commerce types.

## Rental Discovery Architecture

The future `/rentals` feed should consume focused repository helpers:

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

City is a simple fixture-backed query for now. UI filtering and advanced query abstractions remain future scope.

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

The current centralized navigation is intentionally unchanged in TASK 007. Removing Discover now would direct users to incomplete Looks and Rentals placeholders. Navigation should switch only when the new Looks feed is ready, and it must continue to be defined once in `config/navigation.ts`.

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

Possible future result routes:

```text
/search
/categories/[slug]
/products
```

Only existing routes are implemented today. TASK 007 does not create placeholder dynamic routes.

## `/discover` Migration Plan

`/discover` is transitional and is not part of the future primary navigation. It must remain operational until the new Looks experience is complete.

Recommended migration:

1. Keep `/discover` working while the new Looks feed and Look Details experience are incomplete.
2. Build `/looks` and `/looks/[slug]` as the primary discovery surfaces.
3. Move reusable product-results behavior to future `/products`, `/search`, or `/categories/[slug]` result routes when those use cases are implemented.
4. Redirect `/discover` to `/looks` only after navigation, links, metadata, and saved URLs have an approved migration path.

This avoids destructive route removal and preserves the existing Product Feature.

## Deferred Capabilities

- final Home, Looks, Look Details, and Rentals interfaces
- search, filtering, sorting, and pagination
- favorites persistence
- authentication and profile personalization
- Supabase and remote data
- dynamic brand and rental-business pages

## Decisions Required Before the Next Task

- Approve the first Look card and Look Details information hierarchy before final UI implementation.
- Confirm that `/discover` should ultimately redirect to `/looks` after product-result routes have been separated.
