import type { Metadata } from "next";

import type { Look } from "@/domain/look";

const looksCanonicalBase = "https://foundher.example/looks";

export function createLookMetadata(look: Look): Metadata {
  const canonical = `${looksCanonicalBase}/${look.slug}`;
  const image = look.coverImage.url
    ? [{ url: look.coverImage.url, alt: look.coverImage.alt }]
    : undefined;

  return {
    title: look.title,
    description: look.story,
    alternates: { canonical },
    openGraph: {
      title: look.title,
      description: look.story,
      type: "website",
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
