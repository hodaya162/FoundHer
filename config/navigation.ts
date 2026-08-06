import {
  Compass,
  Heart,
  Home,
  LayoutGrid,
  Store,
  UserRound,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";

export type NavigationHref = "/" | `/${string}`;

export type NavigationItem = {
  readonly label: string;
  readonly href: NavigationHref;
  readonly icon: LucideIcon;
};

const navigationItems = {
  home: { label: "בית", href: "/", icon: Home },
  discover: { label: "גילוי", href: "/discover", icon: Compass },
  looks: { label: "לוקים", href: "/looks", icon: LayoutGrid },
  rentals: { label: "השכרות", href: "/rentals", icon: WandSparkles },
  brands: { label: "מותגים", href: "/brands", icon: Store },
  favorites: { label: "מועדפים", href: "/favorites", icon: Heart },
  profile: { label: "פרופיל", href: "/profile", icon: UserRound },
} as const satisfies Record<string, NavigationItem>;

export const desktopNavigationItems = [
  navigationItems.home,
  navigationItems.discover,
  navigationItems.looks,
  navigationItems.rentals,
  navigationItems.brands,
  navigationItems.favorites,
] as const;

export const mobileNavigationItems = [
  navigationItems.home,
  navigationItems.discover,
  navigationItems.looks,
  navigationItems.favorites,
  navigationItems.profile,
] as const;

/** Matches only the route itself or a nested path segment. The home route is exact-only. */
export function isRouteActive(pathname: string, href: NavigationHref): boolean {
  const normalizedPathname = pathname.length > 1 && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;

  if (href === "/") return normalizedPathname === "/";
  return normalizedPathname === href || normalizedPathname.startsWith(`${href}/`);
}
