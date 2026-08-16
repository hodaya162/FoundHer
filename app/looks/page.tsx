import type { Metadata } from "next";

import { PageContainer, PageHeader } from "@/components/layout";
import { siteConfig } from "@/config/site";
import { createCanonicalUrl } from "@/config/site-url";
import { LookGrid, LooksEmptyState } from "@/features/looks/components";
import { getAllLooks } from "@/lib/repositories/looks.repository";

const pageTitle = "לוקים והשראה";
const pageDescription = "רעיונות שלמים ללבוש לשבת, לעבודה, לאירועים וליום־יום.";
const canonical = createCanonicalUrl("/looks");

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: canonical ? { canonical } : undefined,
  robots: { index: false, follow: true },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "website",
    locale: siteConfig.openGraphLocale,
    siteName: siteConfig.name,
    url: canonical,
  },
};

export default function LooksPage() {
  const looks = getAllLooks();

  return (
    <main>
      <PageContainer className="pb-16 sm:pb-20">
        <PageHeader eyebrow="ללבוש את ההרגשה" title={pageTitle} description={pageDescription} />
        <p className="type-body mb-9 max-w-2xl text-muted sm:mb-12">
          כל לוק מתחיל ברגע אמיתי וממשיך לפריטים שאפשר לרכוש או לשכור כדי ליצור אותו בדרך שלך.
        </p>
        {looks.length > 0 ? <LookGrid looks={looks} /> : <LooksEmptyState />}
      </PageContainer>
    </main>
  );
}
