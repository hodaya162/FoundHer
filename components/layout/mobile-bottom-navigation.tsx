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
      className="fixed inset-x-0 bottom-0 z-[var(--z-navigation)] border-t border-border bg-background/96 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
    >
      <ul className="mx-auto grid h-[var(--mobile-navigation-height)] max-w-xl grid-cols-5 px-1">
        {mobileNavigationItems.map((item) => {
          const active = isRouteActive(pathname, item.href);
          const Icon = item.icon;
          return (
            <li key={item.href} className="min-w-0">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-full min-h-11 min-w-11 flex-col items-center justify-center gap-1 rounded-button px-1 text-[0.6875rem] font-medium text-muted transition-colors",
                  "hover:bg-surface-muted hover:text-foreground [&_svg]:size-5 [&_svg]:shrink-0",
                  active && "text-primary",
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
