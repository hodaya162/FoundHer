"use server";

import { redirect } from "next/navigation";

import { getAdminRecoveryCallbackUrl } from "@/config/admin-auth-url";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function requestAdminPasswordReset(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  if (!email) redirect("/admin/forgot-password?error=missing");

  const authClient = await createServerSupabaseClient();
  if (!authClient) redirect("/admin/forgot-password?error=config");

  let redirectTo: string;
  try {
    redirectTo = getAdminRecoveryCallbackUrl();
  } catch {
    redirect("/admin/forgot-password?error=config");
  }

  // Always return the same browser response. Supabase also deliberately avoids
  // revealing whether an account exists for the submitted address.
  await authClient.auth.resetPasswordForEmail(email, { redirectTo });
  redirect("/admin/forgot-password?sent=1");
}

