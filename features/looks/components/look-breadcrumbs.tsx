import Link from "next/link";

type LookBreadcrumbsProps = { lookTitle: string };

export function LookBreadcrumbs({ lookTitle }: LookBreadcrumbsProps) {
  return (
    <nav aria-label="פירורי לחם" className="py-5">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
        <li><Link href="/" className="hover:text-foreground">בית</Link></li>
        <li aria-hidden="true">/</li>
        <li><Link href="/looks" className="hover:text-foreground">לוקים</Link></li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="text-foreground">{lookTitle}</li>
      </ol>
    </nav>
  );
}
