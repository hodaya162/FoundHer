import { PageContainer } from "@/components/layout";
import { Skeleton } from "@/components/ui";

export default function LookDetailsLoading() {
  return (
    <main>
      <PageContainer className="space-y-8 py-6">
        <Skeleton className="h-4 w-64 max-w-full" />
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(19rem,0.8fr)] lg:gap-12">
          <Skeleton className="aspect-[4/5] w-full rounded-card" />
          <div className="space-y-5 py-8">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </PageContainer>
    </main>
  );
}
