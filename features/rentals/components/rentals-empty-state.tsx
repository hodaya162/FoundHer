import { Sparkles } from "lucide-react";

import { EmptyState } from "@/components/ui";

type RentalsEmptyStateProps = {
  businessName?: string;
};

export function RentalsEmptyState({ businessName }: RentalsEmptyStateProps) {
  return (
    <EmptyState
      headingLevel={2}
      icon={<Sparkles />}
      title={businessName ? `אין כרגע שמלות זמינות מ־${businessName}` : "אין כרגע שמלות זמינות"}
      description="הקולקציה מתעדכנת באופן שוטף. כדאי לחזור לכאן בקרוב ולגלות שמלות חדשות."
    />
  );
}
