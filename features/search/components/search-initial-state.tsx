import Link from "next/link";
import { ArrowLeft, Heart, LayoutGrid, WandSparkles } from "lucide-react";

const suggestions = ["שמלה כחולה לאירוע", "לוק לשבת", "השכרה ירושלים", "Brand A"];

export function SearchInitialState() {
  return (
    <div className="space-y-9 pb-8">
      <section aria-labelledby="search-suggestions-title">
        <h2 id="search-suggestions-title" className="type-label mb-3 text-muted">חיפושים שאפשר להתחיל מהם</h2>
        <div className="hide-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
          {suggestions.map((suggestion) => (
            <Link key={suggestion} href={`/search?q=${encodeURIComponent(suggestion)}`} className="inline-flex min-h-10 shrink-0 items-center rounded-full border border-border bg-surface px-4 text-sm">
              {suggestion}
            </Link>
          ))}
        </div>
      </section>
      <section aria-labelledby="search-categories-title">
        <h2 id="search-categories-title" className="type-section-title mb-4">לגלות לפי סוג</h2>
        <div className="grid grid-cols-3 gap-2">
          {[
            { href: "/looks", label: "לוקים", icon: LayoutGrid },
            { href: "/discover", label: "פריטים", icon: Heart },
            { href: "/rentals", label: "השכרות", icon: WandSparkles },
          ].map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href} className="flex min-h-24 flex-col justify-between rounded-card bg-surface-muted p-3 text-sm font-semibold">
              <Icon aria-hidden="true" className="size-5 text-primary" />
              <span className="flex items-center justify-between gap-1">{label}<ArrowLeft aria-hidden="true" className="size-4" /></span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
