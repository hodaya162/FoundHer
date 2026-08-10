import { Search } from "lucide-react";
import Link from "next/link";

import { PageContainer } from "./page-container";
import { DesktopNavigation } from "./desktop-navigation";
import { SiteLogo } from "./site-logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-[var(--z-sticky)] h-16 border-b border-border bg-background/92 backdrop-blur-md md:h-[var(--desktop-header-height)]">
      <PageContainer className="flex h-full items-center justify-between gap-5">
        <SiteLogo href="/" />
        <div className="hidden md:block">
          <DesktopNavigation />
        </div>
        <nav className="flex items-center gap-1" aria-label="פעולות משתמש">
          <Link
            href="/search"
            aria-label="חיפוש ב־FoundHer"
            className="inline-grid size-11 place-items-center rounded-full text-foreground transition-colors hover:bg-surface-muted [&_svg]:size-5"
          >
            <Search aria-hidden="true" />
          </Link>
        </nav>
      </PageContainer>
    </header>
  );
}
