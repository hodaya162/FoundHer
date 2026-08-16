import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type EmptyStateProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
  headingLevel?: 1 | 2 | 3;
};

export function EmptyState({ action, className, description, headingLevel = 3, icon, title, ...props }: EmptyStateProps) {
  const Heading = `h${headingLevel}` as const;

  return (
    <div className={cn("px-4 py-10 text-center", className)} {...props}>
      {icon ? <div aria-hidden="true" className="mx-auto mb-4 grid size-10 place-items-center rounded-full bg-surface-muted text-primary [&_svg]:size-5">{icon}</div> : null}
      <Heading className="type-section-title">{title}</Heading>
      <p className="type-body-small mx-auto mt-3 max-w-md text-muted">{description}</p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}
