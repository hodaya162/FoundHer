import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label" | "children"> & {
  "aria-label": string;
  children: ReactNode;
};

export function IconButton({ className, type = "button", ...props }: IconButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-grid size-11 shrink-0 place-items-center rounded-full border border-border bg-surface text-foreground transition-colors hover:bg-surface-muted disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-5",
        className,
      )}
      {...props}
    />
  );
}
