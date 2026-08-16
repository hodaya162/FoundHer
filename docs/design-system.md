# FoundHer Mobile Design System

## Direction

FoundHer is fashion-first: imagery leads, interface recedes, and copy stays concise. Mobile widths from 360–430px are the design authority. Desktop expands the same system with bounded grids and whitespace rather than a separate product.

## Tokens

- Background: warm near-white `--background` (`#fffcfa`).
- Surface: white `--surface`; tinted `--surface-muted` is reserved for quiet grouping.
- Text: near-black `--foreground`; supporting copy uses warm grey `--muted`.
- Accent: restrained dusty rose `--primary`; it marks emphasis, favorites, and small labels rather than filling pages.
- Borders: subtle warm neutral `--border`; borders and shadows are not the primary means of grouping.
- Radius: `--radius-card` for imagery/cards, `--radius-button` for controls, circles only for icon actions.

## Typography and spacing

- Five practical levels: display, page title, section title, body, and caption/label.
- Headlines are editorial and medium-weight; body copy is short and decision-oriented.
- Mobile page padding is 16px, increasing to 24px above the small breakpoint.
- Sections use a 40–56px rhythm. Cards use image-to-caption spacing rather than bordered containers.

## Presentation patterns

- Editorial/Look: dominant portrait image, minimal tags, short title, favorite action.
- Product: 4:5 portrait image, seller, title, price, favorite action; no footer CTA inside listing cards.
- Rental: 4:5 portrait image, business, title, rental price/location, quiet demo disclosure.
- Detail: image gallery first, concise identity and metadata second, verified actions only.
- Horizontal rails use snap scrolling on mobile and become bounded grids on larger screens.

## Navigation and interaction

- Compact wordmark header with one Search affordance.
- Four real bottom destinations only: Home, Looks, Rentals, Favorites.
- Selected navigation is signaled by typography and a thin accent, not a filled pill.
- Controls preserve approximately 44px touch targets, visible focus, semantic links/buttons, and `aria-pressed` for Favorites.
- RTL is native: logical properties, mirrored content flow, and natural horizontal rails.

## Guardrails

- Do not add decorative containers, heavy shadows, explanatory paragraphs, or arbitrary pills.
- Do not invent popularity, filters, commercial actions, partners, or external URLs.
- Demo disclosures remain visible but secondary. Preview remains noindex and non-canonical.
