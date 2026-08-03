import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type PageHeaderProps = HTMLAttributes<HTMLElement> & {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function PageHeader({ actions, className, description, eyebrow, title, ...props }: PageHeaderProps) {
  return (
    <header className={cn("flex flex-col gap-6 py-10 sm:py-14 md:flex-row md:items-end md:justify-between", className)} {...props}>
      <div className="max-w-3xl">
        {eyebrow ? <p className="type-label mb-3 text-primary">{eyebrow}</p> : null}
        <h1 className="type-page-title">{title}</h1>
        {description ? <p className="type-body mt-4 max-w-2xl text-muted">{description}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap gap-3">{actions}</div> : null}
    </header>
  );
}
