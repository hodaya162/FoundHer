import type { Look } from "@/domain/look";

export const looks = [
  {
    id: "look-denim-soft-everyday",
    slug: "denim-soft-everyday",
    title: "ג׳ינס ובהיר ליום־יום",
    description: "חצאית ג׳ינס מקסי עם חולצת בייסיק בהירה.",
    productRefs: [
      { sourceId: "mini-allenby", productId: "8127186239674" },
      { sourceId: "mini-allenby", productId: "7027663863994" },
    ],
    composition: {
      layout: "photo-product",
      heroProductId: "mini-allenby:8127186239674",
      imageTypes: {
        "mini-allenby:8127186239674": "model-full",
        "mini-allenby:7027663863994": "clean-product",
      },
    },
    occasions: ["everyday"],
    styleTags: ["casual", "modern", "soft"],
    seasonTags: ["all_season"],
    featured: true,
    createdAt: "2026-10-06T09:00:00.000Z",
  },
  {
    id: "look-navy-collar-work",
    slug: "navy-collar-work",
    title: "כחול רך לעבודה",
    description: "חצאית כחולה מלאה עם חולצת צווארון בגוון טבעי.",
    productRefs: [
      { sourceId: "mini-allenby", productId: "8520914469050" },
      { sourceId: "mini-allenby", productId: "8484734173370" },
    ],
    composition: {
      layout: "photo-pair",
      heroProductId: "mini-allenby:8520914469050",
      imageTypes: {
        "mini-allenby:8520914469050": "model-full",
        "mini-allenby:8484734173370": "model-full",
      },
    },
    occasions: ["work"],
    styleTags: ["minimal", "classic", "soft"],
    seasonTags: ["all_season"],
    featured: true,
    createdAt: "2026-10-06T09:10:00.000Z",
  },
  {
    id: "look-white-lace-shabbat",
    slug: "white-lace-shabbat",
    title: "תחרה לבנה לשבת",
    description: "שמלת תחרה ארוכה ונקייה לשבת או לאירוע קל.",
    productRefs: [
      { sourceId: "mini-allenby", productId: "8412275310778" },
    ],
    composition: {
      layout: "single-photo",
      heroProductId: "mini-allenby:8412275310778",
      imageTypes: {
        "mini-allenby:8412275310778": "model-full",
      },
    },
    occasions: ["shabbat", "evening_event"],
    styleTags: ["elegant", "romantic", "classic"],
    seasonTags: ["spring", "summer"],
    featured: true,
    createdAt: "2026-10-06T09:20:00.000Z",
  },
] as const satisfies readonly Look[];
