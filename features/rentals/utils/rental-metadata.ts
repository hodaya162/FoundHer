import type { Metadata } from "next";

import type { RentalBusiness } from "@/domain/rental-business";

const canonicalBase = "https://foundher.example";

export const rentalsPageTitle = "השכרות";
export const rentalsPageDescription = "שמלות ערב וכלה צנועות להשכרה ממגוון עסקים, במקום אחד.";

export const rentalsPageMetadata: Metadata = {
  title: rentalsPageTitle,
  description: rentalsPageDescription,
  alternates: { canonical: `${canonicalBase}/rentals` },
  openGraph: {
    title: rentalsPageTitle,
    description: rentalsPageDescription,
    type: "website",
    url: `${canonicalBase}/rentals`,
  },
  twitter: {
    card: "summary_large_image",
    title: rentalsPageTitle,
    description: rentalsPageDescription,
  },
};

export function createRentalBusinessMetadata(business: RentalBusiness): Metadata {
  const title = `${business.name} — שמלות להשכרה`;
  const canonical = `${canonicalBase}/rental-businesses/${business.slug}`;
  const image = business.coverImage;

  return {
    title,
    description: business.description,
    alternates: { canonical },
    openGraph: {
      title,
      description: business.description,
      type: "website",
      url: canonical,
      images: [{ url: image.url, alt: image.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: business.description,
      images: [image.url],
    },
  };
}
