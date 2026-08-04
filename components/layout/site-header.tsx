import { Search, UserRound } from "lucide-react";
import Link from "next/link";

import { PageContainer } from "./page-container";
import { DesktopNavigation } from "./desktop-navigation";
import { SiteLogo } from "./site-logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-[var(--z-sticky)] hidden h-[var(--desktop-header-height)] border-b border-border bg-background/92 backdrop-blur-md md:block">
      <PageContainer className="flex h-full items-center justify-between gap-5">
        <SiteLogo href="/" />
        <DesktopNavigation />
        <nav className="flex items-center gap-1" aria-label="פעולות משתמש">
          <Link
            href="/discover"
            aria-label="חיפוש — מעבר לעמוד הגילוי"
            className="inline-grid size-11 place-items-center rounded-full text-foreground transition-colors hover:bg-surface-muted [&_svg]:size-5"
          >
            <Search aria-hidden="true" />
          </Link>
          <Link
            href="/profile"
            aria-label="פרופיל"
            className="inline-grid size-11 place-items-center rounded-full text-foreground transition-colors hover:bg-surface-muted [&_svg]:size-5"
          >
            <UserRound aria-hidden="true" />
          </Link>
        </nav>
      </PageContainer>
    </header>
  );
}
