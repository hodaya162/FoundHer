import type { MetadataRoute } from "next";

import { createCanonicalUrl, isIndexingEnabled } from "@/config/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const homeUrl = createCanonicalUrl("/");

  if (!homeUrl || !isIndexingEnabled()) return [];

  return [
    {
      url: homeUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
