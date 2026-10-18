"use client";

import { createBrowserClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

import { getSupabasePublicConfig } from "./config";

export function createBrowserSupabaseClient() {
  const config = getSupabasePublicConfig();
  if (!config) throw new Error("Supabase public configuration is unavailable.");
  return createBrowserClient(config.url, config.publishableKey, {
    auth: { detectSessionInUrl: false },
  });
}

export function createPasswordRecoveryRequestClient() {
  const config = getSupabasePublicConfig();
  if (!config) throw new Error("Supabase public configuration is unavailable.");

  // Recovery links must work when the email is opened in a different browser
  // or device than the one that requested it. Unlike PKCE, the implicit flow
  // does not depend on a verifier stored in the requesting browser.
  return createClient(config.url, config.publishableKey, {
    auth: {
      flowType: "implicit",
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}

