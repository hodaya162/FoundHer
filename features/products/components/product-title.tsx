import Link from "next/link";

export type ProductTitleProps = {
  external?: boolean;
  href: string;
  name: string;
};

export function ProductTitle({ external = false, href, name }: ProductTitleProps) {
  return (
    <h3 className="type-card-title">
      <Link
        href={href}
        className="rounded-sm hover:text-primary focus-visible:outline-offset-4"
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {name}
      </Link>
    </h3>
  );
}
