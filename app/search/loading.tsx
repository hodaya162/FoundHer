import { PageContainer } from "@/components/layout";
import { Skeleton } from "@/components/ui";

export default function SearchLoading() {
  return (
    <main>
      <PageContainer className="space-y-8 py-10 sm:py-14">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-12 w-full max-w-xl" />
        <Skeleton className="h-12 w-full" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => <Skeleton key={index} className="aspect-[4/5]" />)}
        </div>
      </PageContainer>
    </main>
  );
}
