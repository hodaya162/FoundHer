export function normalizeSearch(value: string): string {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase("he-IL")
    .replace(/[\p{P}\p{S}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getSearchTerms(value: string): readonly string[] {
  const normalized = normalizeSearch(value);
  return normalized ? [...new Set(normalized.split(" "))] : [];
}
