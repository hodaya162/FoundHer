import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type SectionHeaderProps = HTMLAttributes<HTMLElement> & {
  eyebrow?: string;
  title: string;
  titleId?: string;
  description?: string;
  action?: ReactNode;
};

export function SectionHeader({ action, className, description, eyebrow, title, titleId, ...props }: SectionHeaderProps) {
  return (
    <header className={cn("mb-5 flex items-end justify-between gap-4", className)} {...props}>
      <div>
        {eyebrow ? <p className="type-label mb-2 text-primary">{eyebrow}</p> : null}
        <h2 id={titleId} className="type-section-title">{title}</h2>
        {description ? <p className="type-body-small mt-1.5 max-w-xl text-muted">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}
