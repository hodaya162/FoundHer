import type { LookLabCategory, LookLabLayout } from "../types/look-lab";

export const categoryLabels: Record<LookLabCategory, string> = {
  everyday: "יום־יום",
  work: "עבודה",
  shabbat: "שבת",
  event: "אירוע",
  vacation: "חופשה",
};

export const categoryStyles: Record<LookLabCategory, string> = {
  everyday: "bg-[#eee5d8] text-[#6f5942]",
  work: "bg-[#dce7de] text-[#52675a]",
  shabbat: "bg-[#efdde2] text-[#7f4955]",
  event: "bg-[#e8ddea] text-[#684d6e]",
  vacation: "bg-[#dfe9ec] text-[#506a72]",
};

export const variantLabels: Record<LookLabLayout, string> = {
  "flatlay-editorial": "Flat-lay editorial",
  "flatlay-alternative": "Flat-lay alternative",
  "photo-editorial": "Photo editorial",
  "split-editorial": "Split editorial",
};
