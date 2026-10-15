"use client";

import { useEffect } from "react";

import { createBrowserSupabaseClient } from "@/lib/supabase/client";

const RESET_PASSWORD_PATH = "/admin/reset-password";
const INVALID_RECOVERY_PATH = "/admin/login?error=recovery_invalid";

function hasRecoveryIntent(url: URL) {
  const fragment = new URLSearchParams(url.hash.slice(1));
  return (
    url.searchParams.has("code") ||
    url.searchParams.get("type") === "recovery" ||
    fragment.get("type") === "recovery"
  );
}

/**
 * Supabase normally returns recovery links to the server callback. Some email
 * delivery configurations fall back to Site URL and put the recovery state in
 * the URL. This bridge accepts that state only as a password-recovery intent,
 * lets Supabase validate it, and redirects to one fixed internal destination.
 */
export function RecoveryLandingBridge() {
  useEffect(() => {
    const landingUrl = new URL(window.location.href);
    if (!hasRecoveryIntent(landingUrl)) return;

    let completed = false;
    const recoveryTimeout: { id?: number } = {};
    const authClient = createBrowserSupabaseClient();

    const finish = (destination: string) => {
      if (completed) return;
      completed = true;
      if (recoveryTimeout.id) window.clearTimeout(recoveryTimeout.id);
      // Remove one-time recovery material from browser history before leaving.
      window.history.replaceState(null, "", landingUrl.pathname);
      window.location.replace(destination);
    };

    const { data: listener } = authClient.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" && session) finish(RESET_PASSWORD_PATH);
    });

    void authClient.auth.getSession().then(({ data, error }) => {
      if (!error && data.session) finish(RESET_PASSWORD_PATH);
    });

    recoveryTimeout.id = window.setTimeout(() => finish(INVALID_RECOVERY_PATH), 8000);

    return () => {
      if (recoveryTimeout.id) window.clearTimeout(recoveryTimeout.id);
      listener.subscription.unsubscribe();
    };
  }, []);

  return null;
}
