"use server";

import { revalidatePath } from "next/cache";

import { CATALOG_MODERATION_STATUSES, type CatalogModerationStatus } from "@/domain/catalog-moderation";
import { requireCatalogAdmin } from "@/lib/auth/catalog-admin";
import { updateImageModeration, updateProductModeration } from "@/lib/catalog/catalog-moderation-service";

function parseStatus(value: FormDataEntryValue | null): CatalogModerationStatus {
  const status = String(value ?? "");
  if (!CATALOG_MODERATION_STATUSES.includes(status as CatalogModerationStatus)) throw new Error("Invalid moderation status.");
  return status as CatalogModerationStatus;
}

function requiredText(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  if (!value) throw new Error(`Missing ${key}.`);
  return value;
}

function revalidateCatalog() {
  for (const path of ["/", "/discover", "/search", "/looks", "/favorites", "/brands", "/admin/catalog-moderation"]) {
    revalidatePath(path);
  }
}

export async function setProductModerationStatus(formData: FormData) {
  await requireCatalogAdmin();
  await updateProductModeration({
    sourceId: requiredText(formData, "sourceId"),
    externalProductId: requiredText(formData, "externalProductId"),
    status: parseStatus(formData.get("status")),
  });
  revalidateCatalog();
}

export async function setImageModerationStatus(formData: FormData) {
  await requireCatalogAdmin();
  await updateImageModeration({
    sourceId: requiredText(formData, "sourceId"),
    externalProductId: requiredText(formData, "externalProductId"),
    imageId: requiredText(formData, "imageId"),
    status: parseStatus(formData.get("status")),
  });
  revalidateCatalog();
}

