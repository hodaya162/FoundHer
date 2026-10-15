import type { MetadataRoute } from "next";

import { createCanonicalUrl, isIndexingEnabled } from "@/config/site-url";

const excludedRoutes = [
  "/admin",
  "/brands",
  "/design-system",
  "/discover",
  "/favorites",
  "/looks",
  "/product",
  "/products",
  "/profile",
  "/rental-businesses",
  "/rentals",
  "/search",
];

export default function robots(): MetadataRoute.Robots {
  if (!isIndexingEnabled()) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: excludedRoutes,
    },
    sitemap: createCanonicalUrl("/sitemap.xml"),
  };
}
