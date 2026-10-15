import "server-only";

import { createClient } from "@supabase/supabase-js";

import { getSupabaseSecretConfig } from "./secret-config";

export function createSupabaseAdminClient() {
  const config = getSupabaseSecretConfig();
  if (!config) return undefined;
  return createClient(config.url, config.secretKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

