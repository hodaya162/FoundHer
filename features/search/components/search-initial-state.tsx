import Link from "next/link";
import { Search } from "lucide-react";

import { buttonVariants, EmptyState } from "@/components/ui";
import { cn } from "@/lib/utils";

const suggestions = ["שמלה כחולה לאירוע", "לוק לשבת", "השכרה ירושלים", "Esti Belle"];

export function SearchInitialState() {
  return (
    <EmptyState
      headingLevel={2}
      icon={<Search />}
      title="מה תרצי למצוא?"
      description="חפשי במקביל לוקים, פריטים לרכישה, שמלות להשכרה, מותגים ועסקי השכרה."
      action={<div className="flex flex-wrap justify-center gap-2">{suggestions.map((suggestion) => <Link key={suggestion} href={`/search?q=${encodeURIComponent(suggestion)}`} className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}>{suggestion}</Link>)}</div>}
    />
  );
}
