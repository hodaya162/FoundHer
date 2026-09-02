import type { LookOccasion, LookSeasonTag, LookStyleTag } from "@/domain/look";

export const occasionLabels: Record<LookOccasion, string> = {
  wedding_guest: "אורחת בחתונה",
  evening_event: "אירוע ערב",
  shabbat: "שבת",
  work: "עבודה",
  everyday: "יום־יום",
  vacation: "חופשה",
  nursing: "הנקה",
  holiday: "חג",
};

export const occasionAccentClasses: Record<LookOccasion, string> = {
  wedding_guest: "bg-[#f3e4e7] text-[#84545e]",
  evening_event: "bg-[#eee2e8] text-[#775264]",
  shabbat: "bg-[#eee6f0] text-[#65506b]",
  work: "bg-[#e9edf0] text-[#4c5961]",
  everyday: "bg-[#eee8df] text-[#5f554b]",
  vacation: "bg-[#e7efeb] text-[#4d675b]",
  nursing: "bg-[#f1e7e1] text-[#785c50]",
  holiday: "bg-[#eee7dc] text-[#715f45]",
};

export const styleLabels: Record<LookStyleTag, string> = {
  elegant: "אלגנטי",
  romantic: "רומנטי",
  minimal: "מינימליסטי",
  classic: "קלאסי",
  casual: "קז׳ואל",
  modern: "מודרני",
  soft: "רך",
  formal: "רשמי",
};

export const seasonLabels: Record<LookSeasonTag, string> = {
  spring: "אביב",
  summer: "קיץ",
  autumn: "סתיו",
  winter: "חורף",
  all_season: "לכל עונה",
};
