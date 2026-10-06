import type { Metadata } from "next";

import { PageContainer, PageHeader } from "@/components/layout";
import { siteConfig } from "@/config/site";
import { createCanonicalUrl } from "@/config/site-url";
import { LookGrid, LooksEmptyState } from "@/features/looks/components";
import { getLookCardModels } from "@/features/looks/queries/get-look-card-models";
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

export default async function LooksPage() {
  const looks = getAllLooks();
  const models = await getLookCardModels(looks);

  return (
    <main>
      <PageContainer className="pb-16 sm:pb-20">
        <PageHeader eyebrow="השראה" title="לוקים" description="רעיונות שלמים ליום־יום, שבת ואירועים." />
        {models.length > 0 ? <LookGrid models={models} featuredFirst /> : <LooksEmptyState />}
      </PageContainer>
    </main>
  );
}
