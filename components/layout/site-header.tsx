"use client";

import { Heart, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { PageContainer } from "./page-container";
import { DesktopNavigation } from "./desktop-navigation";
import { SiteLogo } from "./site-logo";

export function SiteHeader() {
  const isHome = usePathname() === "/";

  return (
    <header className="sticky top-0 z-[var(--z-sticky)] h-14 border-b border-border/70 bg-background/94 backdrop-blur-xl md:h-[var(--desktop-header-height)]">
      <PageContainer className={isHome ? "grid h-full grid-cols-[2.75rem_1fr_2.75rem] items-center md:flex md:justify-between" : "flex h-full items-center justify-between gap-5"}>
        {isHome ? (
          <Link href="/favorites" aria-label="מעבר לשמורים" className="inline-grid size-11 place-items-center rounded-full text-foreground hover:bg-surface-muted md:hidden">
            <Heart aria-hidden="true" className="size-[1.15rem]" />
          </Link>
        ) : null}
        <SiteLogo href="/" className={isHome ? "justify-self-center text-[1.75rem]" : undefined} />
        <div className="hidden md:block">
          <DesktopNavigation />
        </div>
        <nav className={isHome ? "justify-self-end" : "flex items-center gap-1"} aria-label="פעולות משתמש">
          {isHome ? <span aria-hidden="true" className="block size-11" /> : (
            <Link
              href="/search"
              aria-label="חיפוש ב־FoundHer"
              className="inline-grid size-11 place-items-center rounded-full text-foreground transition-colors hover:bg-surface-muted [&_svg]:size-[1.15rem]"
            >
              <Search aria-hidden="true" />
            </Link>
          )}
        </nav>
      </PageContainer>
    </header>
  );
}
