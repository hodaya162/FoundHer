import { getConfiguredSiteUrl, type SiteUrlEnvironment } from "./site-url";

const ADMIN_RECOVERY_CALLBACK_PATH = "/admin/auth/callback";

export function getAdminRecoveryCallbackUrl(environment: SiteUrlEnvironment = process.env): string {
  const siteUrl = getConfiguredSiteUrl(environment);

  if (!siteUrl) {
    throw new Error("NEXT_PUBLIC_SITE_URL is required for admin password recovery.");
  }

  return new URL(ADMIN_RECOVERY_CALLBACK_PATH, siteUrl).toString();
}

