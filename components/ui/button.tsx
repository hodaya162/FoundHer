import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-button border px-5 text-sm font-semibold transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "border-primary bg-primary text-white hover:border-primary-hover hover:bg-primary-hover",
        secondary: "border-border bg-surface text-foreground hover:bg-surface-muted",
        ghost: "border-transparent bg-transparent text-foreground hover:bg-surface-muted",
        destructive: "border-destructive bg-destructive text-white hover:opacity-90",
      },
      size: {
        sm: "min-h-10 px-4 text-xs",
        md: "min-h-11 px-5",
        lg: "min-h-12 px-6",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
