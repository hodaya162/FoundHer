import Link from "next/link";

import type { ProductType } from "@/domain/product";

export type ProductBreadcrumbsProps = {
  productName: string;
  productType: ProductType;
};

export function ProductBreadcrumbs({ productName, productType }: ProductBreadcrumbsProps) {
  const parent = productType === "purchase"
    ? { href: "/discover", label: "גילוי" }
    : { href: "/rentals", label: "השכרות" };

  return (
    <nav aria-label="פירורי לחם" className="type-caption py-5">
      <ol className="flex flex-wrap items-center gap-2">
        <li><Link href="/">בית</Link></li>
        <li aria-hidden="true">/</li>
        <li><Link href={parent.href}>{parent.label}</Link></li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="text-foreground">{productName}</li>
      </ol>
    </nav>
  );
}
