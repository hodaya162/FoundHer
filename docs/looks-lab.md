# FoundHer Looks Lab

`/looks-lab` is a temporary visual laboratory for a Hero-led editorial Look language. It is not the public Looks feed and is marked `noindex`.

Public Preview: `TASK 024C preview pending deployment`

## Rendering pipeline

`HeroLook` selects a Hero Product, ordered supporting Products, category, deterministic layout variant, subtle canvas tone, and a four-to-five-color palette derived from the visible outfit. Each source is classified as product-only, clean-background, model, or detail, and must pass `modestySafe` and `moodboardReady` before it can render.

The renderer uses deterministic HTML/CSS positioning, cropping, containment, layering, and restrained presentation shadows. Existing demo images may receive safe deterministic background removal only when the whole Product is visible; their Product pixels are not recolored, redrawn, reshaped, or extended. New internal demo-only cutouts are marked as lab assets, expose no fake Product link, and are not represented as partner inventory. The renderer never composites Products onto a model or invents hidden pixels.

## Review set

| Look | Hero | Variant | Products | Sources |
| --- | --- | --- | --- | --- |
| ג׳ינס, פסים וזהב | חצאית ג׳ינס ארוכה | Hero Center | חצאית ג׳ינס, חולצת פסים, סניקרס לבנות, חולצה שחורה, שרשרת זהב | Denim blue / light blue / white / black / gold |
| בורדו על סאטן | חצאית מקסי סאטן | Hero Edge | חצאית סאטן, סריג בורדו, מרי־ג׳יין, חישוקי זהב | Cream / burgundy / black / gold |
| שחור, כחול וזהב | חצאית מקסי שחורה | Layered Editorial | חצאית שחורה, חולצה כחולה בהירה, לופרס אספרסו, שרשרת זהב | Black / light blue / espresso / gold |
| שבת עם פרינט | חצאית מקסי מודפסת | Hero Center | חצאית מודפסת, חולצת ריב, סלינגבק, עגילי פנינה | Demo product/detail assets |
| זית ובורדו בעיר | חצאית מקסי זית | Hero Edge | חצאית זית, סריג בורדו, סניקרס שחורות, חישוקים כסופים | Demo product/detail assets |
| מרווה לחופשה | שמלת קפלים | Layered Editorial | שמלת קפלים, סנדלים שטוחים, חישוקי זהב | Demo product/detail assets |
| פרינט, שחור ולבן | חצאית מקסי מודפסת | Layered Editorial | חצאית מודפסת, חולצה שחורה, סניקרס לבנות, צמיד זהב | Demo product/detail assets |
| פרחוני ליד האגם | צילום המקור של “ערב בסאטן רך” | Model Hero | צילום שמלה, נעלי בובה, שרשרת זהב, עגילי פנינה | One real model photo; three demo assets |

The only real source in the lab is the existing original model photograph used by “ערב בסאטן רך”. It stays intact and uses `object-cover`; `backgroundRemovalSafe` is false. Every other lab source is explicitly demo content and must not be represented as verified or purchasable partner inventory. The first three cards intentionally use the approved denim-blue, cream-burgundy, and black-blue art directions and clean shared canvases rather than visible product rectangles.

## Interaction and containment

- Category filters use the URL and do not alter production Search architecture.
- Favorites reuse the existing browser-local service.
- Look details begin with the same composition and then show each original Product image, seller label, price, and safe internal Product route.
- The comparison control is lab-only and changes layout, never Products or source imagery.
- Mobile is authoritative at 360, 390, 400, and 430px. Desktop centers and contains the same experience.
- Refreshed deployed QA passed at 360, 390, 400, and 430px with no page-level horizontal overflow or broken images. The 390px Preview renders the approved first-three sequence, remains `noindex, nofollow`, and emits no canonical URL. Desktop remains contained with 496px cards at 1280px.

## TASK 024B editorial rhythm

> Superseded by TASK 024C. The forced four-variant sequencing was visually rejected because it could make source photography serve a template instead of preserving the source.

TASK 024B keeps the existing Looks Lab architecture and Product set, while making the feed less mechanically repetitive. The four deterministic composition families are now named and used as follows:

- **Skirt Hero** — the maxi garment leads, while the top, shoes, and jewelry overlap its negative space asymmetrically.
- **Layered Street** — the top or layer receives more visual weight and supporting products enter the composition from different edges.
- **Clean Minimal** — one dominant garment, a restrained accessory cluster, and more deliberate breathing room.
- **Photo-led** — an intact on-model source photograph becomes the editorial Hero; companion Products remain separate and never imply a shared photo shoot.

The first six Looks alternate Skirt Hero, Layered Street, and Clean Minimal without repeating a composition consecutively. The first card receives a slightly taller editorial canvas, accessories and footwear remain inspectable rather than thumbnail-sized, and a quiet “הבחירות של FoundHer” divider changes the feed rhythm after the first three cards. Non-transparent demo sources receive only deterministic containment, blending, and edge-softening; no source Product is regenerated, redrawn, recolored, or extended.

## TASK 024C asset-first rendering

The layout is now selected after resolving the source assets:

- `product-cutout`, `product-studio`, and `detail` sources can form a product-led flat-lay when every silhouette can remain visible.
- A `model-full` source selects Photo Editorial automatically. The complete original photograph is shown with `object-fit: contain` at its natural composition; it is never masked, background-removed, or forced into a product cutout.
- Two `model-crop-safe` sources may select Split Editorial, but each still uses contained fitting in the current MVP.
- `unsuitable` assets are excluded rather than forced into a Look.

The review surface intentionally stops at three Looks: two clean product-led boards followed by one full-source model photograph with separate companion products. The former comparison grid, forced four-layout sequence, edge masks, and model `object-cover` treatment were removed. No AI redraw, generative fill, hidden-pixel reconstruction, or new Product imagery is used.
