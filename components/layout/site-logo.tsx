import Link from "next/link";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type SiteLogoProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "full" | "compact";
  href?: string;
};

export function SiteLogo({ className, href, variant = "full", ...props }: SiteLogoProps) {
  const wordmark = (
    <span
      aria-label="FoundHer"
      className={cn(
        "inline-flex items-baseline font-serif font-semibold leading-none tracking-[-0.055em] text-foreground",
        variant === "full" ? "text-[1.85rem] sm:text-[2rem]" : "text-xl",
        className,
      )}
      dir="ltr"
      {...props}
    >
      {variant === "full" ? "FoundHer" : "FH"}<span aria-hidden="true" className="text-primary">.</span>
    </span>
  );

  return href ? <Link href={href} aria-label="FoundHer — דף הבית">{wordmark}</Link> : wordmark;
}
