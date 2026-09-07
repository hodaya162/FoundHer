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
  wedding_guest: "bg-[#f0e3e9] text-[#744858]",
  evening_event: "bg-[#ede1e9] text-[#68455b]",
  shabbat: "bg-[#f1e2e5] text-[#7b4651]",
  work: "bg-[#e5ece6] text-[#4d6253]",
  everyday: "bg-[#eee5d8] text-[#6f5942]",
  vacation: "bg-[#e5ebef] text-[#50636f]",
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
