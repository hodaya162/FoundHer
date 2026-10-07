import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { createCanonicalUrl } from "@/config/site-url";
import type { Look } from "@/domain/look";
import type { ImageAsset } from "@/domain/media";

export function createLookMetadata(look: Look, imageAsset?: ImageAsset): Metadata {
  const canonical = createCanonicalUrl(`/looks/${look.slug}`);
  const image = imageAsset?.url
    ? [{ url: imageAsset.url, alt: imageAsset.alt }]
    : undefined;

  return {
    title: look.title,
    description: look.description,
    alternates: canonical ? { canonical } : undefined,
    robots: { index: false, follow: true },
    openGraph: {
      title: look.title,
      description: look.description,
      type: "website",
      locale: siteConfig.openGraphLocale,
      siteName: siteConfig.name,
      url: canonical,
      images: image,
    },
    twitter: {
      card: "summary_large_image",
      title: look.title,
      description: look.description,
      images: image?.map(({ url }) => url),
    },
  };
}
