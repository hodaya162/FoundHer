import { PackageOpen } from "lucide-react";

import { EmptyState } from "@/components/ui";

export function ProductEmptyState() {
  return (
    <EmptyState
      icon={<PackageOpen />}
      title="עוד לא נמצאו פריטים"
      description="פריטים חדשים יופיעו כאן ברגע שיתווספו לקולקציה של FoundHer."
    />
  );
}
