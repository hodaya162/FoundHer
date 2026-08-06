import { ResponsiveGrid } from "@/components/layout";
import { Skeleton } from "@/components/ui";

export type ProductGridSkeletonProps = {
  count?: number;
};

export function ProductGridSkeleton({ count = 8 }: ProductGridSkeletonProps) {
  return (
    <ResponsiveGrid columns={4} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="space-y-3">
          <Skeleton className="aspect-[4/5] w-full rounded-card" />
          <Skeleton className="h-3 w-2/3" />
          <Skeleton className="h-5 w-4/5" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      ))}
    </ResponsiveGrid>
  );
}
