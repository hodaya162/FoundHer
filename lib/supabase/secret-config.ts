import "server-only";

import { getSupabasePublicConfig } from "./config";

export function getSupabaseSecretConfig() {
  const publicConfig = getSupabasePublicConfig();
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!publicConfig || !secretKey || secretKey === "[SENSITIVE]") return undefined;
  return { ...publicConfig, secretKey };
}
