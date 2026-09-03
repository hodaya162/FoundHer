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
  layout?: "grid" | "editorial-a" | "editorial-b";
};

const gridByCount: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-2 grid-rows-2 [&>*:first-child]:row-span-2",
  4: "grid-cols-2 grid-rows-2",
  5: "grid-cols-6 grid-rows-2 [&>*:nth-child(-n+3)]:col-span-2 [&>*:nth-child(n+4)]:col-span-3",
};

const secondaryGridByCount: Record<number, string> = {
  1: "grid-cols-1 grid-rows-1",
  2: "grid-cols-1 grid-rows-2",
  3: "grid-cols-1 grid-rows-3",
  4: "grid-cols-2 grid-rows-2",
};

export function LookProductCollage({ className, items, layout = "grid", linkItems = false, priority = false, showPrices = false }: LookProductCollageProps) {
  const visibleItems = items.slice(0, 5);
  const gridClass = gridByCount[visibleItems.length] ?? "grid-cols-2";

  function renderItem(item: LookProductItem, index: number) {
    const amount = item.product.type === "purchase" ? item.product.price : item.product.rentalPrice;
    const preserveSilhouette = item.product.categoryId === "category-shoes" || item.product.categoryId === "category-jewelry";
    const content = (
      <>
        <Image
          src={item.image.url}
          alt={item.image.alt}
          fill
          priority={priority && index === 0}
          sizes={layout === "grid" ? "(max-width: 639px) 42vw, (max-width: 1023px) 28vw, 18vw" : "(max-width: 767px) 62vw, 34vw"}
          className={cn(
            "transition-transform duration-300 group-hover:scale-[1.025]",
            preserveSilhouette ? "object-contain p-1.5" : "object-cover",
          )}
        />
        {showPrices ? (
          <span className="absolute bottom-2 start-2 rounded-[0.4rem] border border-black/5 bg-[#fffdf9]/94 px-2 py-1 text-[0.72rem] font-semibold leading-none text-foreground shadow-[0_1px_3px_rgba(37,30,27,0.12)] backdrop-blur-sm">
            {formatProductPrice(amount, item.product.currency)}{item.product.type !== "purchase" ? " · להשכרה" : ""}
          </span>
        ) : null}
      </>
    );

    return linkItems ? (
      <Link key={item.product.id} href={item.href} className="group relative block h-full min-h-0 overflow-hidden bg-surface" aria-label={`פתיחת הפריט ${item.product.name}`}>
        {content}
      </Link>
    ) : (
      <div key={item.product.id} className="group relative h-full min-h-0 overflow-hidden bg-surface">
        {content}
      </div>
    );
  }

  if (layout !== "grid" && visibleItems.length > 1) {
    const secondaryItems = visibleItems.slice(1);
    return (
      <div
        className={cn(
          "flex aspect-[4/3] gap-1.5 overflow-hidden rounded-[1.05rem] bg-surface-muted",
          layout === "editorial-b" ? "flex-row-reverse" : "flex-row",
          className,
        )}
        aria-label="Moodboard של פריטים מקוריים ונפרדים המרכיבים את הלוק"
      >
        <div className="relative basis-[61%] overflow-hidden">{renderItem(visibleItems[0], 0)}</div>
        <div className={cn("grid min-w-0 flex-1 gap-1.5", secondaryGridByCount[secondaryItems.length] ?? "grid-cols-2 grid-rows-2")}>
          {secondaryItems.map((item, index) => renderItem(item, index + 1))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("grid aspect-[4/5] gap-1 overflow-hidden rounded-card bg-surface-muted", gridClass, className)}
      aria-label="Moodboard של פריטים נפרדים המרכיבים את הלוק"
    >
      {visibleItems.map(renderItem)}
    </div>
  );
}
