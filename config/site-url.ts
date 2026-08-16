const LOCAL_SITE_URL = new URL("http://localhost:3000");

export type SiteUrlEnvironment = {
  readonly NEXT_PUBLIC_SITE_URL?: string;
  readonly NODE_ENV?: string;
  readonly VERCEL_ENV?: string;
  readonly VERCEL_URL?: string;
};

function parseSiteUrl(value: string, variableName: string): URL {
  let url: URL;

  try {
    url = new URL(value);
  } catch {
    throw new Error(`${variableName} must be a valid absolute URL.`);
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error(`${variableName} must use http or https.`);
  }

  if (url.username || url.password || url.search || url.hash) {
    throw new Error(`${variableName} must contain only an origin.`);
  }

  if (url.pathname !== "/") {
    throw new Error(`${variableName} must not include a path.`);
  }

  return url;
}

export function getConfiguredSiteUrl(
  environment: SiteUrlEnvironment = process.env,
): URL | null {
  const value = environment.NEXT_PUBLIC_SITE_URL?.trim();
  return value ? parseSiteUrl(value, "NEXT_PUBLIC_SITE_URL") : null;
}

export function getMetadataBase(
  environment: SiteUrlEnvironment = process.env,
): URL {
  const configuredUrl = getConfiguredSiteUrl(environment);
  if (configuredUrl) return configuredUrl;

  const vercelUrl = environment.VERCEL_URL?.trim();
  if (vercelUrl) {
    return parseSiteUrl(
      vercelUrl.startsWith("http://") || vercelUrl.startsWith("https://")
        ? vercelUrl
        : `https://${vercelUrl}`,
      "VERCEL_URL",
    );
  }

  return LOCAL_SITE_URL;
}

export function createCanonicalUrl(
  pathname: string,
  environment: SiteUrlEnvironment = process.env,
): string | undefined {
  const configuredUrl = getConfiguredSiteUrl(environment);
  return configuredUrl ? new URL(pathname, configuredUrl).toString() : undefined;
}

export function isIndexingEnabled(
  environment: SiteUrlEnvironment = process.env,
): boolean {
  const configuredUrl = getConfiguredSiteUrl(environment);
  const isLocalUrl = configuredUrl
    ? ["localhost", "127.0.0.1", "[::1]"].includes(configuredUrl.hostname)
    : false;

  return configuredUrl?.protocol === "https:"
    && !isLocalUrl
    && environment.NODE_ENV === "production"
    && environment.VERCEL_ENV !== "preview"
    && environment.VERCEL_ENV !== "development";
}
