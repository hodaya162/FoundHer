import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const columns = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

export type ResponsiveGridProps = HTMLAttributes<HTMLDivElement> & {
  columns?: keyof typeof columns;
};

export function ResponsiveGrid({ className, columns: columnCount = 3, ...props }: ResponsiveGridProps) {
  return <div className={cn("grid grid-cols-1 gap-4 sm:gap-5", columns[columnCount], className)} {...props} />;
}
