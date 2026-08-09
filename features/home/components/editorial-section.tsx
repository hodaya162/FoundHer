import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

import { SectionHeader } from "@/components/layout";
import { cn } from "@/lib/utils";

type EditorialSectionProps = {
  actionHref?: string;
  actionLabel?: string;
  children: ReactNode;
  className?: string;
  description?: string;
  eyebrow?: string;
  id: string;
  title: string;
  tone?: "default" | "muted";
};

export function EditorialSection({
  actionHref,
  actionLabel,
  children,
  className,
  description,
  eyebrow,
  id,
  title,
  tone = "default",
}: EditorialSectionProps) {
  const action = actionHref && actionLabel ? (
    <Link href={actionHref} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary">
      {actionLabel}
      <ArrowLeft aria-hidden="true" className="size-4" />
    </Link>
  ) : undefined;

  return (
    <section
      aria-labelledby={id}
      className={cn(
        "py-12 sm:py-16",
        tone === "muted" && "rounded-card bg-surface-muted px-4 sm:px-7 lg:px-9",
        className,
      )}
    >
      <SectionHeader eyebrow={eyebrow} title={title} titleId={id} description={description} action={action} />
      {children}
    </section>
  );
}
