import Image from "next/image";
import Link from "next/link";

const categories = [
  { label: "הכול", href: "/discover", image: "/images/categories/all.webp" },
  { label: "לוקים", href: "/looks", image: "/images/categories/looks.webp" },
  { label: "פריטים", href: "/discover", image: "/images/categories/products.webp" },
  { label: "השכרות", href: "/rentals", image: "/images/categories/rentals.webp" },
  { label: "אירועים", href: "/search?q=אירוע", image: "/images/categories/events.webp" },
  { label: "שבת", href: "/search?q=שבת", image: "/images/categories/shabbat.webp" },
] as const;

export function HomeCategoryRail() {
  return (
    <nav aria-label="קטגוריות גילוי" className="-mx-4 sm:mx-0">
      <ul className="hide-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 sm:px-0">
        {categories.map(({ href, image, label }) => (
          <li key={label} className="w-[4.25rem] shrink-0 snap-start text-center">
            <Link href={href} className="group flex min-h-16 flex-col items-center justify-center gap-1.5 rounded-card text-xs font-medium text-foreground">
              <span className="relative size-12 overflow-hidden rounded-full bg-surface-muted ring-1 ring-border/70">
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </span>
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
