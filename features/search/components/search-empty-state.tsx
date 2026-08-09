import Link from "next/link";
import { SearchX } from "lucide-react";

import { buttonVariants, EmptyState } from "@/components/ui";
import { cn } from "@/lib/utils";

export function SearchEmptyState({ query }: { query: string }) {
  return (
    <EmptyState
      headingLevel={2}
      icon={<SearchX />}
      title={`לא מצאנו תוצאות עבור “${query}”`}
      description="נסי ניסוח קצר או כללי יותר, או המשיכי לגלות דרך הלוקים וההשכרות."
      action={<div className="flex flex-wrap justify-center gap-3"><Link href="/looks" className={cn(buttonVariants())}>לגלות לוקים</Link><Link href="/rentals" className={cn(buttonVariants({ variant: "secondary" }))}>למצוא השכרה</Link></div>}
    />
  );
}
