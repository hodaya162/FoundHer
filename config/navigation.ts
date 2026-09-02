import {
  Heart,
  Home,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";

import { HangerIcon, LooksIcon } from "@/components/icons";

export type NavigationHref = "/" | `/${string}`;

export type NavigationItem = {
  readonly label: string;
  readonly href: NavigationHref;
  readonly icon: ComponentType<LucideProps>;
};

const navigationItems = {
  home: { label: "בית", href: "/", icon: Home },
  looks: { label: "לוקים", href: "/looks", icon: LooksIcon },
  rentals: { label: "השכרות", href: "/rentals", icon: HangerIcon },
  favorites: { label: "שמורים", href: "/favorites", icon: Heart },
} as const satisfies Record<string, NavigationItem>;

export const desktopNavigationItems = [
  navigationItems.home,
  navigationItems.looks,
  navigationItems.rentals,
  navigationItems.favorites,
] as const;

export const mobileNavigationItems = [
  navigationItems.home,
  navigationItems.looks,
  navigationItems.rentals,
  navigationItems.favorites,
] as const;

/** Matches only the route itself or a nested path segment. The home route is exact-only. */
export function isRouteActive(pathname: string, href: NavigationHref): boolean {
  const normalizedPathname = pathname.length > 1 && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;

  if (href === "/") return normalizedPathname === "/";
  return normalizedPathname === href || normalizedPathname.startsWith(`${href}/`);
}
