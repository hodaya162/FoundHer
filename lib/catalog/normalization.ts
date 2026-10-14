import type { CatalogCategory, NormalizedCatalogValue } from "@/domain/catalog";

const VALUE_ALIASES: Readonly<Record<string, string>> = {
  balck: "black",
  grey: "gray",
  gary: "gray",
  being: "beige",
  kraem: "cream",
  "drak blue": "dark-blue",
  "sea blue": "sea-blue",
  "one size": "ONE_SIZE",
};

export function normalizeCatalogValue(raw: string): NormalizedCatalogValue {
  const trimmed = raw.trim();
  const lower = trimmed.toLocaleLowerCase("en-US");
  const aliased = VALUE_ALIASES[lower] ?? lower;
  const normalized = /^(xs|s|m|l|xl|xxl)(-(xs|s|m|l|xl|xxl))*$/i.test(aliased)
    ? aliased.toUpperCase()
    : aliased;

  return { raw: trimmed, normalized };
}

export function uniqueNormalizedValues(values: readonly string[]): readonly NormalizedCatalogValue[] {
  const result = new Map<string, NormalizedCatalogValue>();
  for (const raw of values) {
    const value = normalizeCatalogValue(raw);
    if (value.raw && !result.has(value.normalized)) result.set(value.normalized, value);
  }
  return [...result.values()];
}

export function mapCatalogCategory(input: { readonly productType?: string; readonly title: string }): CatalogCategory {
  const value = `${input.productType ?? ""} ${input.title}`.toLocaleLowerCase("he-IL");

  if (/חצאית|חאצית|skirt/.test(value)) return "skirts";
  if (/שמלה|dress/.test(value)) return "dresses";
  if (/בגד ים|בגדי ים|swimwear|swimsuit/.test(value)) return "swimwear";
  if (/גקט|ז'קט|מעיל|קרדיגן|jacket|blazer|outerwear/.test(value)) return "outerwear";
  if (/מטפחת|צעיף|גרביון|טייץ|תכשיט|שרשרת|עגיל|תיק|חגורה|accessor|scarf|bag|belt/.test(value)) return "accessories";
  if (/חולצ|shirt|top|blouse|basic/.test(value)) return "tops";
  return "other";
}
