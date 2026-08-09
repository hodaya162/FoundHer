import { getFavoriteKey, isFavoriteReference, type FavoriteReference } from "../types/favorite";
import type { FavoritesStorage, KeyValueStorage } from "./favorites-storage";

export const FAVORITES_STORAGE_KEY = "foundher:favorites:v1";

export function normalizeFavorites(value: unknown): readonly FavoriteReference[] {
  if (!Array.isArray(value)) return [];

  const seen = new Set<string>();
  return value.filter((entry): entry is FavoriteReference => {
    if (!isFavoriteReference(entry)) return false;
    const key = getFavoriteKey(entry);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function deserializeFavorites(serialized: string | null): readonly FavoriteReference[] {
  if (!serialized) return [];

  try {
    return normalizeFavorites(JSON.parse(serialized));
  } catch {
    return [];
  }
}

export function serializeFavorites(favorites: readonly FavoriteReference[]): string {
  return JSON.stringify(normalizeFavorites(favorites));
}

export class LocalFavoritesStorage implements FavoritesStorage {
  constructor(private readonly storage: KeyValueStorage | null) {}

  read(): readonly FavoriteReference[] {
    if (!this.storage) return [];
    try {
      return deserializeFavorites(this.storage.getItem(FAVORITES_STORAGE_KEY));
    } catch {
      return [];
    }
  }

  write(favorites: readonly FavoriteReference[]): boolean {
    if (!this.storage) return false;
    try {
      this.storage.setItem(FAVORITES_STORAGE_KEY, serializeFavorites(favorites));
      return true;
    } catch {
      return false;
    }
  }
}
