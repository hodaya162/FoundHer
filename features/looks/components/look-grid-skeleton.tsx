import { Skeleton } from "@/components/ui";

export function LookGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3" aria-label="הלוקים נטענים">
      {Array.from({ length: 6 }, (_, index) => (
        <div key={index} className="space-y-4">
          <Skeleton className="aspect-[4/5] w-full rounded-card" />
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  );
}
