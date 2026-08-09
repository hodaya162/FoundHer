export const FAVORITE_ENTITY_TYPES = ["look", "product", "brand"] as const;

export type FavoriteEntityType = (typeof FAVORITE_ENTITY_TYPES)[number];

export type FavoriteReference = {
  readonly entityType: FavoriteEntityType;
  readonly entityId: string;
};

export function isFavoriteReference(value: unknown): value is FavoriteReference {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<FavoriteReference>;
  return FAVORITE_ENTITY_TYPES.includes(candidate.entityType as FavoriteEntityType)
    && typeof candidate.entityId === "string"
    && candidate.entityId.trim().length > 0;
}

export function getFavoriteKey(reference: FavoriteReference): string {
  return `${reference.entityType}:${reference.entityId}`;
}
