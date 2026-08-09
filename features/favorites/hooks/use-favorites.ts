"use client";

import { useSyncExternalStore } from "react";

import { browserFavorites, subscribeToBrowserFavorites } from "../services/browser-favorites";
import type { FavoriteReference } from "../types/favorite";

const EMPTY_FAVORITES: readonly FavoriteReference[] = [];

export function useFavorites(): readonly FavoriteReference[] {
  return useSyncExternalStore(
    subscribeToBrowserFavorites,
    browserFavorites.getFavorites,
    () => EMPTY_FAVORITES,
  );
}

export function useFavorite(reference: FavoriteReference) {
  const favorites = useFavorites();
  const saved = favorites.some(
    (item) => item.entityType === reference.entityType && item.entityId === reference.entityId,
  );

  return {
    saved,
    toggle: () => browserFavorites.toggleFavorite(reference),
  };
}
