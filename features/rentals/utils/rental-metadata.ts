import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { createCanonicalUrl } from "@/config/site-url";
import type { RentalBusiness } from "@/domain/rental-business";

export const rentalsPageTitle = "השכרות";
export const rentalsPageDescription = "שמלות ערב וכלה צנועות להשכרה ממגוון עסקים, במקום אחד.";
const rentalsCanonical = createCanonicalUrl("/rentals");

export const rentalsPageMetadata: Metadata = {
  title: rentalsPageTitle,
  description: rentalsPageDescription,
  alternates: rentalsCanonical ? { canonical: rentalsCanonical } : undefined,
  robots: { index: false, follow: true },
  openGraph: {
    title: rentalsPageTitle,
    description: rentalsPageDescription,
    type: "website",
    locale: siteConfig.openGraphLocale,
    siteName: siteConfig.name,
    url: rentalsCanonical,
  },
  twitter: {
    card: "summary_large_image",
    title: rentalsPageTitle,
    description: rentalsPageDescription,
  },
};

export function createRentalBusinessMetadata(business: RentalBusiness): Metadata {
  const title = `${business.name} — שמלות להשכרה`;
  const canonical = createCanonicalUrl(`/rental-businesses/${business.slug}`);
  const image = business.coverImage;

  return {
    title,
    description: business.description,
    alternates: canonical ? { canonical } : undefined,
    robots: business.isDemo ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description: business.description,
      type: "website",
      locale: siteConfig.openGraphLocale,
      siteName: siteConfig.name,
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
