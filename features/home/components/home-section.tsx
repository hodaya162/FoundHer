import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

type HomeSectionProps = {
  children: ReactNode;
  href?: string;
  id: string;
  title: string;
};

export function HomeSection({ children, href, id, title }: HomeSectionProps) {
  return (
    <section aria-labelledby={id}>
      <header className="mb-3 flex min-h-8 items-center justify-between gap-4">
        <h2 id={id} className="scroll-mt-24 font-serif text-[1.1rem] font-semibold leading-tight tracking-[-0.025em] text-[#241b1d] sm:text-2xl">{title}</h2>
        {href ? (
          <Link href={href} className="inline-flex min-h-11 items-center gap-1 text-xs font-semibold text-muted hover:text-primary">
            לכל התוצאות
            <ArrowLeft aria-hidden="true" className="size-3.5" />
          </Link>
        ) : null}
      </header>
      {children}
    </section>
  );
}
