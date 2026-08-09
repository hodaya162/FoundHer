import type { FavoriteReference } from "../types/favorite";

export interface FavoritesStorage {
  read(): readonly FavoriteReference[];
  write(favorites: readonly FavoriteReference[]): boolean;
}

export type KeyValueStorage = Pick<Storage, "getItem" | "setItem">;
