import { Sparkles } from "lucide-react";

import { EmptyState } from "@/components/ui";

export function LooksEmptyState() {
  return (
    <EmptyState
      headingLevel={2}
      icon={<Sparkles />}
      title="ההשראה בדרך"
      description="לוקים חדשים לשבת, לעבודה ולאירועים יופיעו כאן בקרוב."
    />
  );
}
