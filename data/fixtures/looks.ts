import type { Look, LookOccasion, LookStyleTag } from "@/domain/look";

type Candidate = {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly productIds: readonly string[];
  readonly heroProductId: string;
  readonly occasions: readonly LookOccasion[];
  readonly styleTags: readonly LookStyleTag[];
  readonly sourceId?: string;
};

const sourceId = "mini-allenby";

const candidates: readonly Candidate[] = [
  { slug: "denim-white-everyday", title: "ג׳ינס ולבן ליומיום", description: "חצאית ג׳ינס מקסי עם חולצת בייסיק לבנה.", productIds: ["8127186239674", "7027663863994"], heroProductId: "8127186239674", occasions: ["everyday"], styleTags: ["casual", "modern"] },
  { slug: "navy-collar-work", title: "כחול וצווארון לעבודה", description: "חצאית כחולה עם חולצת צווארון נקייה.", productIds: ["8520914469050", "8484734173370"], heroProductId: "8520914469050", occasions: ["work"], styleTags: ["minimal", "classic"] },
  { slug: "white-lace-shabbat", title: "תחרה לבנה לשבת", description: "שמלת תחרה ארוכה לשבת או לאירוע קל.", productIds: ["8412275310778"], heroProductId: "8412275310778", occasions: ["shabbat", "evening_event"], styleTags: ["elegant", "romantic"] },
  { slug: "plaid-basic-everyday", title: "משבצות ובייסיק ליומיום", description: "חצאית משבצות עם חולצת בייסיק ארוכה.", productIds: ["8520994455738", "7027670778042"], heroProductId: "8520994455738", occasions: ["everyday"], styleTags: ["casual", "classic"] },
  { slug: "satin-clean-shabbat", title: "סאטן וחלק לשבת", description: "חצאית סאטן קלאסית עם חולצה חלקה.", productIds: ["8459122901178", "8356922884282"], heroProductId: "8459122901178", occasions: ["shabbat"], styleTags: ["elegant", "soft"] },
  { slug: "pleats-buttons-work", title: "פליסה וכפתורים לעבודה", description: "חצאית פליסה מבריקה עם חולצת כפתורים.", productIds: ["8487643840698", "8484735516858"], heroProductId: "8487643840698", occasions: ["work"], styleTags: ["modern", "elegant"] },
  { slug: "stripes-classic-vacation", title: "פסים ובהיר לחופשה", description: "חצאית פסים עם חולצה קלאסית בהירה.", productIds: ["8520968274106", "8356922884282"], heroProductId: "8520968274106", occasions: ["vacation", "everyday"], styleTags: ["casual", "soft"] },
  { slug: "tulle-lace-shabbat", title: "טול ותחרה לשבת", description: "חצאית טול קומות עם חולצת תחרה.", productIds: ["8520941306042", "8520932393146"], heroProductId: "8520941306042", occasions: ["shabbat"], styleTags: ["romantic", "elegant"] },
  { slug: "bandana-oversize-everyday", title: "בנדנה ואוברסייז ליומיום", description: "חצאית עם חגורת בנדנה וחולצה אוברסייז.", productIds: ["8487648952506", "8459126833338"], heroProductId: "8487648952506", occasions: ["everyday"], styleTags: ["modern", "casual"] },
  { slug: "rib-basic-urban", title: "ריפ ובייסיק עירוני", description: "חצאית ריפ עם שרוך וחולצת שלושת־רבעי.", productIds: ["8459123589306", "8459132567738"], heroProductId: "8459123589306", occasions: ["everyday"], styleTags: ["casual", "minimal"] },
  { slug: "odel-square-work", title: "אודל ומרובע לעבודה", description: "חצאית אודל עם חגורה וחולצה בפתח מרובע.", productIds: ["8459116085434", "8459124179130"], heroProductId: "8459116085434", occasions: ["work"], styleTags: ["modern", "classic"] },
  { slug: "maayan-collar-work", title: "מעיין וצווארון לעבודה", description: "חצאית מעיין עם חולצת צווארון.", productIds: ["8484734009530", "8484734173370"], heroProductId: "8484734009530", occasions: ["work"], styleTags: ["minimal", "soft"] },
  { slug: "soft-satin-shabbat", title: "סאטן רך לשבת", description: "חצאית סאטן עם שרוך וחולצת תחרה.", productIds: ["8359067812026", "8520932393146"], heroProductId: "8359067812026", occasions: ["shabbat"], styleTags: ["romantic", "soft"] },
  { slug: "drill-long-sleeve-work", title: "דריל ושרוול ארוך", description: "חצאית דריל בגזרת A עם חולצת בייסיק ארוכה.", productIds: ["7031886676154", "8096945438906"], heroProductId: "7031886676154", occasions: ["work", "everyday"], styleTags: ["classic", "casual"] },
  { slug: "denim-a-basic-everyday", title: "ג׳ינס A ובייסיק", description: "חצאית ג׳ינס בגזרת A עם חולצת בייסיק.", productIds: ["7031886446778", "8103887765690"], heroProductId: "7031886446778", occasions: ["everyday"], styleTags: ["casual", "minimal"] },
  { slug: "black-clean-work", title: "שחור נקי לעבודה", description: "חצאית ג׳רסי שחורה עם חולצה קלאסית.", productIds: ["8103888748730", "8484735516858"], heroProductId: "8103888748730", occasions: ["work"], styleTags: ["minimal", "classic"] },
  { slug: "light-embroidery-shabbat", title: "רקמה בהירה לשבת", description: "שמלה רקומה בגוונים בהירים.", productIds: ["8521040330938"], heroProductId: "8521040330938", occasions: ["shabbat"], styleTags: ["romantic", "soft"] },
  { slug: "plaid-dress-everyday", title: "משבצות ליום מסודר", description: "שמלת משבצות עם חגורה ליום מסודר.", productIds: ["8520905261242"], heroProductId: "8520905261242", occasions: ["everyday", "work"], styleTags: ["classic", "casual"] },
  { slug: "striped-lace-event", title: "תחרה ופסים לאירוע", description: "שמלת תחרה עם פסים לאירוע ערב.", productIds: ["8521001894074"], heroProductId: "8521001894074", occasions: ["evening_event"], styleTags: ["elegant", "modern"] },
  { slug: "soft-tulle-event", title: "טול רך לאירוע", description: "שמלת טול עם כיווצים לאירוע.", productIds: ["8520992030906"], heroProductId: "8520992030906", occasions: ["evening_event"], styleTags: ["romantic", "formal"] },
  { slug: "ayala-aviv-pink-shabbat", title: "ורוד אביבי לשבת", description: "שמלת אביב ורודה של אילה שמלות.", productIds: ["aviv-pink"], heroProductId: "aviv-pink", occasions: ["shabbat"], styleTags: ["romantic", "soft"], sourceId: "ayala" },
  { slug: "ayala-tevel-wine-event", title: "יין חגיגי לערב", description: "שמלת תבל בגוון יין של אילה שמלות.", productIds: ["chagim-beet"], heroProductId: "chagim-beet", occasions: ["evening_event"], styleTags: ["elegant", "formal"], sourceId: "ayala" },
  { slug: "ayala-tevel-mint-shabbat", title: "מנטה לחג ולשבת", description: "שמלת תבל בגוון מנטה של אילה שמלות.", productIds: ["chagim-mint"], heroProductId: "chagim-mint", occasions: ["shabbat"], styleTags: ["elegant", "soft"], sourceId: "ayala" },
  { slug: "ayala-cinderella-scarlet-event", title: "סקרלט לאירוע", description: "שמלת סינדרלה בגוון סקרלט של אילה שמלות.", productIds: ["cinderella-scarlet"], heroProductId: "cinderella-scarlet", occasions: ["evening_event"], styleTags: ["elegant", "formal"], sourceId: "ayala" },
  { slug: "ayala-cinderella-turquoise-shabbat", title: "טורקיז לשבת", description: "שמלת סינדרלה בגוון טורקיז של אילה שמלות.", productIds: ["cinderella-turquoise"], heroProductId: "cinderella-turquoise", occasions: ["shabbat", "evening_event"], styleTags: ["romantic", "elegant"], sourceId: "ayala" },
  { slug: "ayala-heidi-daisy-everyday", title: "פרחים ליום אביבי", description: "שמלת היידי חרצית של אילה שמלות.", productIds: ["heidi-daisy"], heroProductId: "heidi-daisy", occasions: ["everyday", "vacation"], styleTags: ["casual", "romantic"], sourceId: "ayala" },
  { slug: "ayala-heidi-lavender-shabbat", title: "לבנדר רך לשבת", description: "שמלת היידי לבנדר של אילה שמלות.", productIds: ["heidi-lavender"], heroProductId: "heidi-lavender", occasions: ["shabbat"], styleTags: ["romantic", "soft"], sourceId: "ayala" },
  { slug: "ayala-rapunzel-purple-event", title: "סגול לערב", description: "שמלת רפונזל סגולה של אילה שמלות.", productIds: ["rapunzel-purple"], heroProductId: "rapunzel-purple", occasions: ["evening_event"], styleTags: ["elegant", "romantic"], sourceId: "ayala" },
  { slug: "ayala-bordeaux-swim-vacation", title: "בורדו לחופשה", description: "בגד ים בורדו של אילה שמלות.", productIds: ["swim-bordeaux"], heroProductId: "swim-bordeaux", occasions: ["vacation"], styleTags: ["modern", "casual"], sourceId: "ayala" },
];

export const looks = candidates.map((candidate, index) => {
  const candidateSourceId = candidate.sourceId ?? sourceId;
  return ({
  id: `look-candidate-${String(index + 1).padStart(2, "0")}`,
  slug: candidate.slug,
  title: candidate.title,
  description: candidate.description,
  productRefs: candidate.productIds.map((productId) => ({ sourceId: candidateSourceId, productId })),
  composition: {
    heroProductId: `${candidateSourceId}:${candidate.heroProductId}`,
    prototype: index === 0 ? {
      layout: "EDITORIAL_OVERLAP_LEFT" as const,
      dominant: { productId: `${sourceId}:8127186239674`, imageIndex: 0, presentation: "MODEL_FULL" as const },
      supporting: { productId: `${sourceId}:7027663863994`, imageIndex: 0, presentation: "PRODUCT_CLEAN" as const },
    } : index === 1 ? {
      layout: "PHOTO_LED" as const,
      dominant: { productId: `${sourceId}:8520914469050`, imageIndex: 0, presentation: "MODEL_FULL" as const },
      supporting: { productId: `${sourceId}:8484734173370`, imageIndex: 6, presentation: "MODEL_CROP_SAFE" as const },
    } : index === 3 ? {
      layout: "EDITORIAL_OVERLAP_RIGHT" as const,
      dominant: { productId: `${sourceId}:8520994455738`, imageIndex: 0, presentation: "MODEL_FULL" as const },
      supporting: { productId: `${sourceId}:7027670778042`, imageIndex: 0, presentation: "PRODUCT_CLEAN" as const },
    } : undefined,
  },
  occasions: candidate.occasions,
  styleTags: candidate.styleTags,
  seasonTags: ["all_season"] as const,
  featured: index < 3,
  createdAt: new Date(Date.UTC(2026, 9, 7, 9, index)).toISOString(),
  });
}) satisfies readonly Look[];
