import { Heart } from "lucide-react";

import { IconButton } from "@/components/ui";

type LookSaveButtonProps = { lookTitle: string; className?: string };

/** Visual-only until favorites persistence is implemented. */
export function LookSaveButton({ className, lookTitle }: LookSaveButtonProps) {
  return (
    <IconButton
      aria-label={`שמירת הלוק ${lookTitle}`}
      aria-pressed="false"
      className={className}
    >
      <Heart aria-hidden="true" />
    </IconButton>
  );
}
