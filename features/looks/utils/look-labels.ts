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
