"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { PageContainer } from "./page-container";
import { DesktopNavigation } from "./desktop-navigation";
import { SiteLogo } from "./site-logo";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isRentals = pathname.startsWith("/rentals");
  const isCenteredMobileHeader = isHome || isRentals;

  return (
    <header className="sticky top-0 z-[var(--z-sticky)] h-[3.75rem] border-b border-border/70 bg-background/94 backdrop-blur-xl md:h-[var(--desktop-header-height)]">
      <PageContainer className={isCenteredMobileHeader ? "grid h-full grid-cols-[2.75rem_1fr_2.75rem] items-center md:flex md:justify-between" : "flex h-full items-center justify-between gap-5"}>
        {isCenteredMobileHeader ? <span aria-hidden="true" className="block size-11 md:hidden" /> : null}
        <SiteLogo href="/" className={isCenteredMobileHeader ? "justify-self-center text-[1.7rem] md:justify-self-auto md:text-[2rem]" : undefined} />
        <div className="hidden md:block">
          <DesktopNavigation />
        </div>
        <nav className={isCenteredMobileHeader ? "justify-self-end" : "flex items-center gap-1"} aria-label="פעולות משתמש">
          {isHome ? <span aria-hidden="true" className="block size-11" /> : (
            <Link
              href="/search"
              aria-label="חיפוש ב־FoundHer"
              className={isRentals ? "hidden size-11 place-items-center rounded-full text-foreground transition-colors hover:bg-surface-muted md:inline-grid [&_svg]:size-[1.15rem]" : "inline-grid size-11 place-items-center rounded-full text-foreground transition-colors hover:bg-surface-muted [&_svg]:size-[1.15rem]"}
            >
              <Search aria-hidden="true" />
            </Link>
          )}
        </nav>
      </PageContainer>
    </header>
  );
}
