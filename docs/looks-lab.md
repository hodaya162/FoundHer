# FoundHer Looks Lab

`/looks-lab` is a temporary visual laboratory for a Hero-led editorial Look language. It is not the public Looks feed and is marked `noindex`.

Public Preview: `https://foundher-6qmwgttuk-found-her1.vercel.app/looks-lab`

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
