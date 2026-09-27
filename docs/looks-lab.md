# FoundHer Looks Lab

`/looks-lab` is a temporary visual laboratory for a Hero-led editorial Look language. It is not the public Looks feed and is marked `noindex`.

Public Preview: `https://foundher-m6xu7b936-found-her1.vercel.app/looks-lab`

## Rendering pipeline

`HeroLook` selects a Hero Product, ordered supporting Products, category, and deterministic layout variant. Each source is classified as product-only, clean-background, model, or detail, and must pass `modestySafe` and `moodboardReady` before it can render. `backgroundRemovalSafe` is descriptive metadata; the lab does not remove or reconstruct source backgrounds.

The renderer uses only deterministic HTML/CSS positioning, cropping, containment, layering, and restrained presentation shadows. It does not generate products, composite a model, or invent hidden pixels.

## Review set

| Look | Hero | Variant | Products | Sources |
| --- | --- | --- | --- | --- |
| ג׳ינס, פסים וזהב | חצאית ג׳ינס ארוכה | Hero Center | חצאית ג׳ינס, חולצה שחורה, חולצת פסים, סניקרס לבנות, שרשרת זהב | Demo product/detail assets |
| בורדו על סאטן | חצאית מקסי סאטן | Hero Edge | חצאית סאטן, סריג בורדו, נעלי בובה, חישוקי זהב | Demo product/detail assets |
| כחול רך לעבודה | חצאית מקסי זית | Layered Editorial | חצאית זית, חולצה כחולה, לופרס, צמיד זהב | Demo product/detail assets |
| שבת עם פרינט | חצאית מקסי מודפסת | Hero Center | חצאית מודפסת, חולצת ריב, סלינגבק, עגילי פנינה | Demo product/detail assets |
| זית ובורדו בעיר | חצאית מקסי זית | Hero Edge | חצאית זית, סריג בורדו, סניקרס שחורות, חישוקים כסופים | Demo product/detail assets |
| מרווה לחופשה | שמלת קפלים | Layered Editorial | שמלת קפלים, סנדלים שטוחים, חישוקי זהב | Demo product/detail assets |
| פרינט, שחור ולבן | חצאית מקסי מודפסת | Layered Editorial | חצאית מודפסת, חולצה שחורה, סניקרס לבנות, צמיד זהב | Demo product/detail assets |
| פרחוני ליד האגם | צילום המקור של “ערב בסאטן רך” | Model Hero | צילום שמלה, נעלי בובה, שרשרת זהב, עגילי פנינה | One real model photo; three demo assets |

The only real source in the lab is the existing original model photograph used by “ערב בסאטן רך”. It stays intact and uses `object-cover`; `backgroundRemovalSafe` is false. Every other lab source is explicitly demo content and must not be represented as verified or purchasable partner inventory.

## Interaction and containment

- Category filters use the URL and do not alter production Search architecture.
- Favorites reuse the existing browser-local service.
- Look details begin with the same composition and then show each original Product image, seller label, price, and safe internal Product route.
- The comparison control is lab-only and changes layout, never Products or source imagery.
- Mobile is authoritative at 360, 390, 400, and 430px. Desktop centers and contains the same experience.
