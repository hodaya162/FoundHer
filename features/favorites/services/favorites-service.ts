import { getFavoriteKey, type FavoriteReference } from "../types/favorite";
import type { FavoritesStorage } from "../storage/favorites-storage";

export type FavoritesService = {
  getFavorites(): readonly FavoriteReference[];
  isFavorite(reference: FavoriteReference): boolean;
  addFavorite(reference: FavoriteReference): void;
  removeFavorite(reference: FavoriteReference): void;
  toggleFavorite(reference: FavoriteReference): void;
  reload(): void;
  subscribe(listener: () => void): () => void;
};

export function createFavoritesService(storage: FavoritesStorage): FavoritesService {
  let favorites = storage.read();
  const listeners = new Set<() => void>();
  const emit = () => listeners.forEach((listener) => listener());
  const replace = (next: readonly FavoriteReference[]) => {
    favorites = next;
    storage.write(next);
    emit();
  };

  return {
    getFavorites: () => favorites,
    isFavorite: (reference) => favorites.some((item) => getFavoriteKey(item) === getFavoriteKey(reference)),
    addFavorite: (reference) => {
      if (!favorites.some((item) => getFavoriteKey(item) === getFavoriteKey(reference))) {
        replace([...favorites, reference]);
      }
    },
    removeFavorite: (reference) => replace(
      favorites.filter((item) => getFavoriteKey(item) !== getFavoriteKey(reference)),
    ),
    toggleFavorite(reference) {
      if (this.isFavorite(reference)) this.removeFavorite(reference);
      else this.addFavorite(reference);
    },
    reload: () => {
      favorites = storage.read();
      emit();
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}
