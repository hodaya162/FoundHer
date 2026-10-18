"use client";

import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export type RecoveryResult = "success" | "missing" | "invalid";

let recoveryAttempt: Promise<RecoveryResult> | undefined;

/** Completes either a cross-browser implicit recovery link or a PKCE link. */
export function completeBrowserPasswordRecovery(url: URL): Promise<RecoveryResult> {
  // React may remount effects; exchange a one-time link only once per page load.
  recoveryAttempt ??= validateBrowserPasswordRecovery(url);
  return recoveryAttempt;
}

async function validateBrowserPasswordRecovery(url: URL): Promise<RecoveryResult> {
  const fragment = new URLSearchParams(url.hash.slice(1));
  if (fragment.has("error") || url.searchParams.has("error")) return "invalid";

  const authClient = createBrowserSupabaseClient();
  const accessToken = fragment.get("access_token");
  const refreshToken = fragment.get("refresh_token");
  const recoveryType = fragment.get("type") ?? url.searchParams.get("type");

  if (recoveryType === "recovery" && accessToken && refreshToken) {
    const { data, error } = await authClient.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
    return !error && data.session ? "success" : "invalid";
  }

  const code = url.searchParams.get("code");
  if (code) {
    const flowId = url.searchParams.get("sb_flow_id");
    const { data, error } = await authClient.auth.exchangeCodeForSession(
      code,
      flowId ? { flowId } : undefined,
    );
    return !error && data.session ? "success" : "invalid";
  }

  return "missing";
}
