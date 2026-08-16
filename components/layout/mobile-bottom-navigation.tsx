"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { isRouteActive, mobileNavigationItems } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function MobileBottomNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="ניווט ראשי בנייד"
      className="fixed inset-x-0 bottom-0 z-[var(--z-navigation)] border-t border-border/70 bg-background/94 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
    >
      <ul className="mx-auto grid h-[var(--mobile-navigation-height)] max-w-md grid-cols-4 px-3">
        {mobileNavigationItems.map((item) => {
          const active = isRouteActive(pathname, item.href);
          const Icon = item.icon;
          return (
            <li key={item.href} className="min-w-0">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex h-full min-h-11 min-w-11 flex-col items-center justify-center gap-0.5 px-1 text-[0.625rem] font-medium text-muted transition-colors",
                  "hover:text-foreground [&_svg]:size-[1.15rem] [&_svg]:shrink-0",
                  "after:absolute after:top-0 after:h-0.5 after:w-5 after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform",
                  active && "text-foreground after:scale-x-100",
                )}
              >
                <Icon aria-hidden="true" strokeWidth={active ? 2.25 : 1.75} />
                <span className="max-w-full truncate">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
