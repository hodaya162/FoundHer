import { ESTI_BELLE_CONTACT } from "@/config/catalog-sources";
import type { ManualCatalogRecord } from "@/lib/catalog/providers/manual-catalog-provider";

type EstiBelleRecord = ManualCatalogRecord & {
  readonly originalSourceFilename: string;
  readonly assetFilename: string;
};

const assets = [
  ["esti-belle-01", "IMG-20261006-WA0038.jpg", "esti-belle-modest-evening-dress-01.jpg", 800, 1023, 1537],
  ["esti-belle-02", "IMG-20261006-WA0042.jpg", "esti-belle-modest-evening-dress-02.jpg", 800, 1024, 1536],
  ["esti-belle-03", "IMG-20261006-WA0035.jpg", "esti-belle-modest-evening-dress-03.jpg", 650, 1073, 1466],
  ["esti-belle-04", "IMG-20261006-WA0036.jpg", "esti-belle-modest-evening-dress-04.jpg", 749, 1023, 1537],
  ["esti-belle-05", "IMG-20261006-WA0040.jpg", "esti-belle-modest-evening-dress-05.jpg", 749, 1086, 1448],
  ["esti-belle-06", "IMG-20261006-WA0044.jpg", "esti-belle-modest-evening-dress-06.jpg", 850, 1024, 1535],
  ["esti-belle-07", "IMG-20261006-WA0037.jpg", "esti-belle-modest-evening-dress-07.jpg", 800, 1023, 1537],
  ["esti-belle-08", "IMG-20261006-WA0039.jpg", "esti-belle-modest-evening-dress-08.jpg", 749, 1024, 1536],
  ["esti-belle-09", "IMG-20261006-WA0041.jpg", "esti-belle-modest-evening-dress-09.jpg", 849, 1024, 1536],
  ["esti-belle-10", "IMG-20261006-WA0043.jpg", "esti-belle-modest-evening-dress-10.jpg", 849, 1024, 1536],
] as const;

export const estiBelleManualCatalog: readonly EstiBelleRecord[] = assets.map(
  ([externalId, originalSourceFilename, assetFilename, price, width, height], index) => ({
    externalId,
    title: `שמלת ערב Esti Belle ${String(index + 1).padStart(2, "0")}`,
    category: "dresses",
    price,
    currency: "ILS",
    productUrl: ESTI_BELLE_CONTACT.instagramUrl,
    purchaseType: "contact",
    contactChannel: "instagram",
    images: [{
      id: `esti-belle:${externalId}:image:1`,
      url: `/images/catalog/esti-belle/${assetFilename}`,
      alt: `שמלת ערב Esti Belle ${String(index + 1).padStart(2, "0")}`,
      width,
      height,
    }],
    tags: ["evening", "dresses"],
    originalSourceFilename,
    assetFilename,
  }),
);
