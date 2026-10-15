import "server-only";

import { redirect } from "next/navigation";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export type CatalogAdmin = {
  readonly userId: string;
  readonly email?: string;
  readonly role: "owner" | "content_manager";
};

export async function getCurrentCatalogAdmin(): Promise<CatalogAdmin | undefined> {
  const authClient = await createServerSupabaseClient();
  if (!authClient) return undefined;
  const { data: userData, error: userError } = await authClient.auth.getUser();
  if (userError || !userData.user) return undefined;
  const { data, error } = await authClient
    .from("admin_users")
    .select("role,active")
    .eq("user_id", userData.user.id)
    .eq("active", true)
    .maybeSingle();
  if (error || !data) return undefined;
  return {
    userId: userData.user.id,
    ...(userData.user.email ? { email: userData.user.email } : {}),
    role: data.role as CatalogAdmin["role"],
  };
}

export async function requireCatalogAdmin() {
  const admin = await getCurrentCatalogAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}

