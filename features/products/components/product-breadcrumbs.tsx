import Link from "next/link";

export type ProductBreadcrumbsProps = {
  productName: string;
};

export function ProductBreadcrumbs({ productName }: ProductBreadcrumbsProps) {
  return (
    <nav aria-label="פירורי לחם" className="type-caption py-5">
      <ol className="flex flex-wrap items-center gap-2">
        <li><Link href="/">בית</Link></li>
        <li aria-hidden="true">/</li>
        <li><Link href="/discover">גילוי</Link></li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="text-foreground">{productName}</li>
      </ol>
    </nav>
  );
}
