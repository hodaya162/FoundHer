import type { LookOccasion } from "@/domain/look";

export const homeOccasionLabels = {
  shabbat: "שבת",
  work: "עבודה",
  evening_event: "אירוע ערב",
  wedding_guest: "אורחת בחתונה",
  everyday: "יום־יום",
  vacation: "חופשה",
  nursing: "הנקה",
  holiday: "חג",
} as const satisfies Record<LookOccasion, string>;
