import Link from "next/link";

export type ProductTitleProps = {
  href: string;
  name: string;
};

export function ProductTitle({ href, name }: ProductTitleProps) {
  return (
    <h3 className="type-card-title">
      <Link href={href} className="rounded-sm hover:text-primary focus-visible:outline-offset-4">
        {name}
      </Link>
    </h3>
  );
}
