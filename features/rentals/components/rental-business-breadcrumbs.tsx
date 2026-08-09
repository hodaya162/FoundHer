import Link from "next/link";

type RentalBusinessBreadcrumbsProps = {
  businessName: string;
};

export function RentalBusinessBreadcrumbs({ businessName }: RentalBusinessBreadcrumbsProps) {
  return (
    <nav aria-label="פירורי לחם" className="type-caption py-5">
      <ol className="flex flex-wrap items-center gap-2">
        <li><Link href="/">בית</Link></li>
        <li aria-hidden="true">/</li>
        <li><Link href="/rentals">השכרות</Link></li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="text-foreground">{businessName}</li>
      </ol>
    </nav>
  );
}
