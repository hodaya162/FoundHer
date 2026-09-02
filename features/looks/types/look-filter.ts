export const LOOK_FILTERS = ["all", "everyday", "work", "event", "vacation", "shabbat"] as const;

export type LookFilter = (typeof LOOK_FILTERS)[number];

export const lookFilterLabels: Record<LookFilter, string> = {
  all: "הכול",
  everyday: "יומיום",
  work: "עבודה",
  event: "אירוע",
  vacation: "חופשה",
  shabbat: "שבת",
};

export function parseLookFilter(value: string | undefined): LookFilter {
  return LOOK_FILTERS.includes(value as LookFilter) ? value as LookFilter : "all";
}
