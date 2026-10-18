"use client";

import { useEffect } from "react";

import { completeBrowserPasswordRecovery } from "@/lib/auth/browser-password-recovery";

const RESET_PASSWORD_PATH = "/admin/reset-password";
const INVALID_RECOVERY_PATH = "/admin/login?error=recovery_invalid";

function hasRecoveryIntent(url: URL) {
  const fragment = new URLSearchParams(url.hash.slice(1));
  return (
    url.searchParams.has("code") ||
    fragment.has("error_code") ||
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
    if (landingUrl.pathname === "/admin/auth/callback") return;
    if (!hasRecoveryIntent(landingUrl)) return;

    let completed = false;
    const recoveryTimeout: { id?: number } = {};
    const finish = (destination: string) => {
      if (completed) return;
      completed = true;
      if (recoveryTimeout.id) window.clearTimeout(recoveryTimeout.id);
      // Remove one-time recovery material from browser history before leaving.
      window.history.replaceState(null, "", landingUrl.pathname);
      window.location.replace(destination);
    };

    void completeBrowserPasswordRecovery(landingUrl)
      .then((result) => finish(result === "success" ? RESET_PASSWORD_PATH : INVALID_RECOVERY_PATH))
      .catch(() => finish(INVALID_RECOVERY_PATH));

    recoveryTimeout.id = window.setTimeout(() => finish(INVALID_RECOVERY_PATH), 8000);

    return () => {
      if (recoveryTimeout.id) window.clearTimeout(recoveryTimeout.id);
    };
  }, []);

  return null;
}
