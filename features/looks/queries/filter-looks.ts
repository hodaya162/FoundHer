import type { Look, LookOccasion } from "@/domain/look";
import { getAllLooks } from "@/lib/repositories/looks.repository";

import type { LookFilter } from "../types/look-filter";
import { occasionLabels, seasonLabels, styleLabels } from "../utils/look-labels";
import { getSearchTerms, normalizeSearch } from "@/features/search/utils/normalize-search";

const filterOccasions: Record<Exclude<LookFilter, "all" | "event">, readonly LookOccasion[]> = {
  everyday: ["everyday"],
  work: ["work"],
  vacation: ["vacation"],
  shabbat: ["shabbat"],
};

function matchesFilter(look: Look, filter: LookFilter): boolean {
  if (filter === "all") return true;
  const occasions = filter === "event"
    ? (["evening_event", "wedding_guest"] as const)
    : filterOccasions[filter];
  return occasions.some((occasion) => look.occasions.includes(occasion));
}

function matchesQuery(look: Look, query: string): boolean {
  const terms = getSearchTerms(query);
  if (terms.length === 0) return true;

  const document = normalizeSearch([
    look.title,
    look.description,
    look.story,
    ...look.occasions.flatMap((occasion) => [occasion, occasionLabels[occasion]]),
    ...look.styleTags.flatMap((style) => [style, styleLabels[style]]),
    ...look.seasonTags.flatMap((season) => [season, seasonLabels[season]]),
  ].join(" "));

  return terms.every((term) => document.includes(term));
}

export function filterLooks(filter: LookFilter, query = ""): readonly Look[] {
  return getAllLooks().filter((look) => matchesFilter(look, filter) && matchesQuery(look, query));
}
