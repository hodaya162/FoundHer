import type { Metadata } from "next";

import { MobileBottomNavigation, SiteFooter, SiteHeader } from "@/components/layout";
import { siteConfig } from "@/config/site";
import { getMetadataBase, isIndexingEnabled } from "@/config/site-url";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: { default: `${siteConfig.name} — ${siteConfig.tagline}`, template: `%s — ${siteConfig.name}` },
  description: siteConfig.description,
  icons: { icon: "/favicon.svg" },
  robots: { index: isIndexingEnabled(), follow: true },
  openGraph: {
    type: "website",
    locale: siteConfig.openGraphLocale,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: "/images/products/embroidered-maxi-dress.jpg",
        alt: "השראה לאופנה צנועה ב־FoundHer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/images/products/embroidered-maxi-dress.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={siteConfig.defaultLocale} dir={siteConfig.direction}>
      <body>
        <a
          href="#main-content"
          className="fixed start-4 top-3 z-[var(--z-modal)] -translate-y-20 rounded-button bg-foreground px-4 py-3 text-sm font-semibold text-background transition-transform focus:translate-y-0"
        >
          דילוג לתוכן הראשי
        </a>
        <div className="application-shell min-h-dvh overflow-x-clip">
          <SiteHeader />
          <div id="main-content" tabIndex={-1} className="min-h-[65dvh]">
            {children}
          </div>
          <SiteFooter />
          <MobileBottomNavigation />
        </div>
      </body>
    </html>
  );
}
