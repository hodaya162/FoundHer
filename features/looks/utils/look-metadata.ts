import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { createCanonicalUrl } from "@/config/site-url";
import type { Look } from "@/domain/look";

export function createLookMetadata(look: Look): Metadata {
  const canonical = createCanonicalUrl(`/looks/${look.slug}`);
  const image = look.coverImage.url
    ? [{ url: look.coverImage.url, alt: look.coverImage.alt }]
    : undefined;

  return {
    title: look.title,
    description: look.story,
    alternates: canonical ? { canonical } : undefined,
    robots: { index: false, follow: true },
    openGraph: {
      title: look.title,
      description: look.story,
      type: "website",
      locale: siteConfig.openGraphLocale,
      siteName: siteConfig.name,
      url: canonical,
      images: image,
    },
    twitter: {
      card: "summary_large_image",
      title: look.title,
      description: look.story,
      images: image?.map(({ url }) => url),
    },
  };
}
