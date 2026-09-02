import Link from "next/link";

import { desktopNavigationItems } from "@/config/navigation";
import { siteConfig } from "@/config/site";

import { PageContainer } from "./page-container";
import { SiteLogo } from "./site-logo";

const footerItems = desktopNavigationItems.filter(({ href }) => ["/discover", "/looks", "/rentals"].includes(href));

export function SiteFooter() {
  return (
    <footer className="hidden border-t border-border py-10 md:block">
      <PageContainer className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-start">
        <SiteLogo href="/" />
        <p className="type-body-small text-muted">{siteConfig.footerTagline}</p>
        <nav aria-label="ניווט משני">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
            {footerItems.map((item) => <li key={item.href}><Link className="rounded-sm hover:text-primary" href={item.href}>{item.label}</Link></li>)}
          </ul>
        </nav>
        <small className="type-caption">© {new Date().getFullYear()} {siteConfig.name}</small>
      </PageContainer>
    </footer>
  );
}
