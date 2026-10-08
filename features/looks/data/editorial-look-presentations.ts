import type { EditorialLookPresentation } from "../types/editorial-look-presentation";

const presentations = {
  "denim-white-everyday": {
    variant: "FEATURED_EDITORIAL",
    tone: "denim",
    dominant: {
      productId: "mini-allenby:8127186239674",
      imageIndex: 0,
      presentation: "MODEL_FULL",
    },
    supporting: {
      productId: "mini-allenby:7027663863994",
      imageIndex: 0,
      presentation: "PRODUCT_CLEAN",
    },
    editorialNote: "ג׳ינס ולבן, בדיוק ליומיום",
  },
  "navy-collar-work": {
    variant: "MODEL_WITH_PRODUCT_BOARD",
    tone: "rose",
    dominant: {
      productId: "mini-allenby:8520914469050",
      imageIndex: 0,
      presentation: "MODEL_FULL",
    },
    supporting: {
      productId: "mini-allenby:8484734173370",
      imageIndex: 6,
      presentation: "MODEL_CROP_SAFE",
    },
    editorialNote: "כחול נקי למשרד",
  },
  "ayala-tevel-wine-event": {
    variant: "SINGLE_PRODUCT_EDITORIAL",
    tone: "wine",
    dominant: {
      productId: "ayala:chagim-beet",
      imageIndex: 0,
      presentation: "MODEL_FULL",
    },
    editorialNote: "שמלת ערב כמוקד אחד",
    singleProductConcept: true,
  },
} as const satisfies Readonly<Record<string, EditorialLookPresentation>>;

export function getEditorialLookPresentation(slug: string): EditorialLookPresentation | undefined {
  return presentations[slug as keyof typeof presentations];
}

export function getEditorialPrototypeSlugs(): readonly string[] {
  return Object.keys(presentations);
}
