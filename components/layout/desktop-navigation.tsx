"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { desktopNavigationItems, isRouteActive } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function DesktopNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="ניווט ראשי">
      <ul className="flex items-center gap-1">
        {desktopNavigationItems.map((item) => {
          const active = isRouteActive(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative inline-flex min-h-11 items-center rounded-button px-3 text-sm font-medium text-muted transition-colors hover:bg-surface-muted hover:text-foreground",
                  "after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:origin-center after:scale-x-0 after:bg-primary after:transition-transform",
                  active && "text-foreground after:scale-x-100",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
