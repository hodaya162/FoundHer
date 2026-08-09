import { FAVORITES_STORAGE_KEY, LocalFavoritesStorage } from "../storage/local-favorites-storage";
import { createFavoritesService, type FavoritesService } from "./favorites-service";

let service: FavoritesService | null = null;
let initializedForBrowser = false;
let storageListenerAttached = false;

function getBrowserStorage(): Storage | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

function getService(): FavoritesService {
  const browserAvailable = typeof window !== "undefined";

  if (!service || (browserAvailable && !initializedForBrowser)) {
    service = createFavoritesService(new LocalFavoritesStorage(getBrowserStorage()));
    initializedForBrowser = browserAvailable;
  }

  return service;
}

export const browserFavorites: FavoritesService = {
  getFavorites: () => getService().getFavorites(),
  isFavorite: (reference) => getService().isFavorite(reference),
  addFavorite: (reference) => getService().addFavorite(reference),
  removeFavorite: (reference) => getService().removeFavorite(reference),
  toggleFavorite: (reference) => getService().toggleFavorite(reference),
  reload: () => getService().reload(),
  subscribe: (listener) => getService().subscribe(listener),
};

export function subscribeToBrowserFavorites(listener: () => void): () => void {
  if (!storageListenerAttached && typeof window !== "undefined") {
    window.addEventListener("storage", (event) => {
      if (event.key === FAVORITES_STORAGE_KEY) browserFavorites.reload();
    });
    storageListenerAttached = true;
  }

  return browserFavorites.subscribe(listener);
}
