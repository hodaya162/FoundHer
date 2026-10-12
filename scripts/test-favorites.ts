import assert from "node:assert/strict";

import { createFavoritesService } from "../features/favorites/services/favorites-service";
import {
  deserializeFavorites,
  FAVORITES_STORAGE_KEY,
  LocalFavoritesStorage,
  serializeFavorites,
} from "../features/favorites/storage/local-favorites-storage";
import type { KeyValueStorage } from "../features/favorites/storage/favorites-storage";
import type { FavoriteReference } from "../features/favorites/types/favorite";
import { getFavoriteProductCategory } from "../features/favorites/utils/favorite-product-category";

class MemoryStorage implements KeyValueStorage {
  private values = new Map<string, string>();
  getItem(key: string) { return this.values.get(key) ?? null; }
  setItem(key: string, value: string) { this.values.set(key, value); }
}

const look: FavoriteReference = { entityType: "look", entityId: "look-1" };
const product: FavoriteReference = { entityType: "product", entityId: "product-1" };
const brand: FavoriteReference = { entityType: "brand", entityId: "brand-1" };
const tehilaRental: FavoriteReference = { entityType: "product", entityId: "tehila-borkhov-rental-01" };

const memory = new MemoryStorage();
const service = createFavoritesService(new LocalFavoritesStorage(memory));

service.addFavorite(look);
assert.equal(service.isFavorite(look), true, "adds a favorite");
service.addFavorite(look);
assert.equal(service.getFavorites().length, 1, "prevents duplicates");
service.addFavorite(product);
service.addFavorite(brand);
assert.deepEqual(service.getFavorites(), [look, product, brand], "supports multiple entity types");
service.removeFavorite(product);
assert.equal(service.isFavorite(product), false, "removes a favorite");
service.toggleFavorite(product);
assert.equal(service.isFavorite(product), true, "toggles a favorite on");
service.toggleFavorite(product);
assert.equal(service.isFavorite(product), false, "toggles a favorite off");

const serialized = serializeFavorites([look, brand]);
assert.deepEqual(deserializeFavorites(serialized), [look, brand], "serialization round-trips stably");
assert.equal(serializeFavorites(deserializeFavorites(serialized)), serialized, "serialization is stable");
assert.deepEqual(deserializeFavorites(serializeFavorites([tehilaRental])), [tehilaRental], "Tehila rental favorite keeps only its stable reference");
assert.deepEqual(deserializeFavorites("not-json"), [], "malformed JSON is ignored");
assert.deepEqual(deserializeFavorites('[{"entityType":"unknown","entityId":"1"}]'), [], "old or invalid values are ignored");

memory.setItem(FAVORITES_STORAGE_KEY, "{");
assert.deepEqual(new LocalFavoritesStorage(memory).read(), [], "malformed stored values do not crash");
const unavailable = createFavoritesService(new LocalFavoritesStorage(null));
unavailable.addFavorite(look);
assert.equal(unavailable.isFavorite(look), true, "missing storage keeps the current session usable");

assert.equal(getFavoriteProductCategory({ type: "purchase" }), "product", "purchase products stay in Products");
assert.equal(getFavoriteProductCategory({ type: "rental_evening" }), "rental", "evening rentals are classified from Product.type");
assert.equal(getFavoriteProductCategory({ type: "rental_bridal" }), "rental", "bridal rentals are classified from Product.type");

console.log("Favorites storage and service tests passed.");
