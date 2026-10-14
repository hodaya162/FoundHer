"use server";

import { redirect } from "next/navigation";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function signInCatalogAdmin(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) redirect("/admin/login?error=missing");
  const authClient = await createServerSupabaseClient();
  const adminClient = createSupabaseAdminClient();
  if (!authClient || !adminClient) redirect("/admin/login?error=config");
  const { data, error } = await authClient.auth.signInWithPassword({ email, password });
  if (error || !data.user) redirect("/admin/login?error=credentials");
  const { data: admin } = await adminClient
    .from("admin_users")
    .select("active")
    .eq("user_id", data.user.id)
    .eq("active", true)
    .maybeSingle();
  if (!admin) {
    await authClient.auth.signOut();
    redirect("/admin/login?error=forbidden");
  }
  redirect("/admin/catalog-moderation");
}

export async function signOutCatalogAdmin() {
  const client = await createServerSupabaseClient();
  await client?.auth.signOut();
  redirect("/admin/login");
}

