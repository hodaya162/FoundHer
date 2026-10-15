"use server";

import { redirect } from "next/navigation";

import { requireCatalogAdmin } from "@/lib/auth/catalog-admin";
import { validateAdminPassword } from "@/lib/auth/password-policy";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function updateAdminPassword(formData: FormData) {
  await requireCatalogAdmin();

  const password = String(formData.get("password") ?? "");
  const confirmation = String(formData.get("passwordConfirmation") ?? "");
  const validation = validateAdminPassword(password, confirmation);
  if (!validation.valid) redirect(`/admin/reset-password?error=${validation.error}`);

  const authClient = await createServerSupabaseClient();
  if (!authClient) redirect("/admin/reset-password?error=config");
  const { error } = await authClient.auth.updateUser({ password });
  if (error) redirect("/admin/reset-password?error=update_failed");

  await authClient.auth.signOut({ scope: "local" });
  redirect("/admin/login?reset=success");
}

