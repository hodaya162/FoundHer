import type { SearchMatchedField } from "../types/search-result";
import { getSearchTerms, normalizeSearch } from "./normalize-search";

export type SearchDocumentFields = {
  readonly title: readonly string[];
  readonly tags?: readonly string[];
  readonly relations?: readonly string[];
  readonly description?: readonly string[];
};

export type SearchScore = {
  readonly matchedFields: readonly SearchMatchedField[];
  readonly matchedTermCount: number;
  readonly score: number;
};

const emptyScore: SearchScore = { matchedFields: [], matchedTermCount: 0, score: 0 };

function bestTermScore(term: string, values: readonly string[], weights: readonly [number, number, number]): number {
  let best = 0;

  for (const value of values) {
    if (value === term) best = Math.max(best, weights[0]);
    else if (value.startsWith(term)) best = Math.max(best, weights[1]);
    else if (value.includes(term)) best = Math.max(best, weights[2]);
  }

  return best;
}

export function scoreSearchDocument(query: string, fields: SearchDocumentFields): SearchScore {
  const normalizedQuery = normalizeSearch(query);
  const terms = getSearchTerms(normalizedQuery);

  if (!normalizedQuery || terms.length === 0) {
    return emptyScore;
  }

  const normalizedFields = {
    title: fields.title.map(normalizeSearch).filter(Boolean),
    tags: (fields.tags ?? []).map(normalizeSearch).filter(Boolean),
    relations: (fields.relations ?? []).map(normalizeSearch).filter(Boolean),
    description: (fields.description ?? []).map(normalizeSearch).filter(Boolean),
  };
  const matchedFields = new Set<SearchMatchedField>();
  const matchedTerms = new Set<string>();
  let score = 0;

  for (const title of normalizedFields.title) {
    if (title === normalizedQuery) score = Math.max(score, 120);
    else if (title.startsWith(normalizedQuery)) score = Math.max(score, 90);
    else if (title.includes(normalizedQuery)) score = Math.max(score, 70);
  }

  for (const term of terms) {
    const titleScore = bestTermScore(term, normalizedFields.title, [35, 28, 22]);
    const tagScore = bestTermScore(term, normalizedFields.tags, [18, 15, 12]);
    const relationScore = bestTermScore(term, normalizedFields.relations, [14, 12, 10]);
    const descriptionScore = bestTermScore(term, normalizedFields.description, [7, 6, 5]);

    if (titleScore > 0) matchedFields.add("title");
    if (tagScore > 0) matchedFields.add("tags");
    if (relationScore > 0) matchedFields.add("relations");
    if (descriptionScore > 0) matchedFields.add("description");

    const termScore = titleScore + tagScore + relationScore + descriptionScore;
    if (termScore > 0) {
      matchedTerms.add(term);
      score += termScore;
    }
  }

  const requiredMatches = Math.min(2, terms.length);
  if (matchedTerms.size < requiredMatches) {
    return emptyScore;
  }

  score += matchedTerms.size * 8;
  if (matchedTerms.size === terms.length) score += 25;

  return {
    matchedFields: [...matchedFields],
    matchedTermCount: matchedTerms.size,
    score,
  };
}
