import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type EmptyStateProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
};

export function EmptyState({ action, className, description, icon, title, ...props }: EmptyStateProps) {
  return (
    <div className={cn("rounded-card border border-border bg-surface-muted px-6 py-12 text-center", className)} {...props}>
      {icon ? <div aria-hidden="true" className="mx-auto mb-4 grid size-11 place-items-center rounded-full bg-surface text-primary [&_svg]:size-5">{icon}</div> : null}
      <h3 className="type-section-title">{title}</h3>
      <p className="type-body-small mx-auto mt-3 max-w-md text-muted">{description}</p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}
