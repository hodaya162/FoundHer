import { NextResponse, type NextRequest } from "next/server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

function loginError(request: NextRequest, error: "recovery_invalid" | "forbidden" | "config") {
  return NextResponse.redirect(new URL(`/admin/login?error=${error}`, request.url));
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const flowId = request.nextUrl.searchParams.get("sb_flow_id");
  if (!code) return loginError(request, "recovery_invalid");

  const authClient = await createServerSupabaseClient();
  if (!authClient) return loginError(request, "config");

  const { data, error } = await authClient.auth.exchangeCodeForSession(
    code,
    flowId ? { flowId } : undefined,
  );
  if (error || !data.user) return loginError(request, "recovery_invalid");

  // Authorization is checked only after Supabase has validated the recovery
  // code and established the user's session. This preserves account recovery
  // while keeping the admin surface restricted to active administrators.
  const { data: admin } = await authClient
    .from("admin_users")
    .select("active")
    .eq("user_id", data.user.id)
    .eq("active", true)
    .maybeSingle();

  if (!admin) {
    await authClient.auth.signOut();
    return loginError(request, "forbidden");
  }

  return NextResponse.redirect(new URL("/admin/reset-password", request.url));
}

