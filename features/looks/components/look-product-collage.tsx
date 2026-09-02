import Image from "next/image";
import Link from "next/link";

import { formatProductPrice } from "@/features/products/utils/format-product-price";
import { cn } from "@/lib/utils";

import type { LookProductItem } from "../types/look-details";

type LookProductCollageProps = {
  items: readonly LookProductItem[];
  priority?: boolean;
  linkItems?: boolean;
  showPrices?: boolean;
  className?: string;
};

const gridByCount: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-2 grid-rows-2 [&>*:first-child]:row-span-2",
  4: "grid-cols-2 grid-rows-2",
  5: "grid-cols-6 grid-rows-2 [&>*:nth-child(-n+3)]:col-span-2 [&>*:nth-child(n+4)]:col-span-3",
};

export function LookProductCollage({ className, items, linkItems = false, priority = false, showPrices = false }: LookProductCollageProps) {
  const visibleItems = items.slice(0, 5);
  const gridClass = gridByCount[visibleItems.length] ?? "grid-cols-2";

  return (
    <div
      className={cn("grid aspect-[4/5] gap-1 overflow-hidden rounded-card bg-surface-muted", gridClass, className)}
      aria-label="Moodboard של פריטים נפרדים המרכיבים את הלוק"
    >
      {visibleItems.map((item, index) => {
        const amount = item.product.type === "purchase" ? item.product.price : item.product.rentalPrice;
        const content = (
          <>
            <Image
              src={item.image.url}
              alt={item.image.alt}
              fill
              priority={priority && index === 0}
              sizes="(max-width: 639px) 42vw, (max-width: 1023px) 28vw, 18vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.025]"
            />
            {showPrices ? (
              <span className="absolute bottom-1.5 start-1.5 rounded-sm bg-surface/90 px-1.5 py-1 backdrop-blur-sm">
                {formatProductPrice(amount, item.product.currency)}{item.product.type !== "purchase" ? " · להשכרה" : ""}
              </span>
            ) : null}
          </>
        );

        return linkItems ? (
          <Link key={item.product.id} href={item.href} className="group relative min-h-0 overflow-hidden bg-surface" aria-label={`פתיחת הפריט ${item.product.name}`}>
            {content}
          </Link>
        ) : (
          <div key={item.product.id} className="group relative min-h-0 overflow-hidden bg-surface">
            {content}
          </div>
        );
      })}
    </div>
  );
}
