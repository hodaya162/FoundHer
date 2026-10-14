import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageContainer } from "@/components/layout";
import { Badge, Button, buttonVariants } from "@/components/ui";
import { catalogSources } from "@/config/catalog-sources";
import type { CatalogModerationStatus } from "@/domain/catalog-moderation";
import { signOutCatalogAdmin } from "@/app/admin/login/actions";
import { requireCatalogAdmin } from "@/lib/auth/catalog-admin";
import { getCatalogModerationProducts, syncCatalogModerationQueue } from "@/lib/catalog/catalog-moderation-service";
import { getAllRawCatalogProducts } from "@/lib/catalog/catalog-service";
import { cn } from "@/lib/utils";

import { setImageModerationStatus, setProductModerationStatus } from "./actions";

export const metadata: Metadata = { title: "ניהול קטלוג", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const statusLabels: Record<CatalogModerationStatus, string> = {
  pending: "לבדיקה",
  approved: "מאושר",
  hidden: "מוסתר",
};

const statusVariants: Record<CatalogModerationStatus, "warning" | "success" | "destructive"> = {
  pending: "warning",
  approved: "success",
  hidden: "destructive",
};

function StatusActions({ sourceId, externalProductId, imageId }: { sourceId: string; externalProductId: string; imageId?: string }) {
  const action = imageId ? setImageModerationStatus : setProductModerationStatus;
  return (
    <div className="grid grid-cols-3 gap-2">
      {(["approved", "pending", "hidden"] as const).map((status) => (
        <form action={action} key={status}>
          <input type="hidden" name="sourceId" value={sourceId} />
          <input type="hidden" name="externalProductId" value={externalProductId} />
          {imageId ? <input type="hidden" name="imageId" value={imageId} /> : null}
          <input type="hidden" name="status" value={status} />
          <Button type="submit" size="sm" variant={status === "approved" ? "primary" : status === "hidden" ? "destructive" : "secondary"} className="w-full px-2">
            {statusLabels[status]}
          </Button>
        </form>
      ))}
    </div>
  );
}

export default async function CatalogModerationPage({ searchParams }: {
  searchParams: Promise<{ status?: string; source?: string }>;
}) {
  const admin = await requireCatalogAdmin();
  const rawProducts = await getAllRawCatalogProducts();
  await syncCatalogModerationQueue(rawProducts);
  const moderationProducts = await getCatalogModerationProducts(rawProducts);
  const params = await searchParams;
  const selectedStatus = (["pending", "approved", "hidden"] as const).find((status) => status === params.status);
  const selectedSource = catalogSources.find(({ id }) => id === params.source)?.id;
  const filtered = moderationProducts
    .filter(({ status }) => !selectedStatus || status === selectedStatus)
    .filter(({ product }) => !selectedSource || product.sourceId === selectedSource);
  const counts = Object.fromEntries((["pending", "approved", "hidden"] as const).map((status) => [
    status,
    moderationProducts.filter((product) => product.status === status).length,
  ]));

  return (
    <main className="bg-background pb-24 pt-8" dir="rtl">
      <PageContainer>
        <header className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="type-label text-primary">FoundHer Admin · Preview</p>
            <h1 className="type-page-title mt-2">ניהול הקטלוג</h1>
            <p className="type-body-small mt-3 text-muted">רק מוצרים ותמונות מאושרים מוצגים לציבור. פריטים חדשים נשארים לבדיקה.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="type-caption">{admin.email ?? "מנהלת מורשית"}</span>
            <form action={signOutCatalogAdmin}><Button type="submit" variant="secondary" size="sm">יציאה</Button></form>
          </div>
        </header>

        <section className="mt-6 space-y-3" aria-label="סינון ניהול קטלוג">
          <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1">
            <Link href="/admin/catalog-moderation" className={cn(buttonVariants({ size: "sm", variant: !selectedStatus ? "primary" : "secondary" }), "shrink-0")}>הכול · {moderationProducts.length}</Link>
            {(["pending", "approved", "hidden"] as const).map((status) => (
              <Link key={status} href={`/admin/catalog-moderation?status=${status}${selectedSource ? `&source=${selectedSource}` : ""}`} className={cn(buttonVariants({ size: "sm", variant: selectedStatus === status ? "primary" : "secondary" }), "shrink-0")}>
                {statusLabels[status]} · {counts[status]}
              </Link>
            ))}
          </div>
          <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1">
            <Link href={selectedStatus ? `/admin/catalog-moderation?status=${selectedStatus}` : "/admin/catalog-moderation"} className={cn(buttonVariants({ size: "sm", variant: !selectedSource ? "primary" : "secondary" }), "shrink-0")}>כל המקורות</Link>
            {catalogSources.map((source) => (
              <Link key={source.id} href={`/admin/catalog-moderation?source=${source.id}${selectedStatus ? `&status=${selectedStatus}` : ""}`} className={cn(buttonVariants({ size: "sm", variant: selectedSource === source.id ? "primary" : "secondary" }), "shrink-0")}>{source.brandName}</Link>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-2" aria-label="מוצרים לבדיקה">
          {filtered.map(({ product, status, images }) => {
            const imageStatuses = new Map(images.map((image) => [image.id, image.status]));
            return (
              <article key={product.id} className="overflow-hidden rounded-card border border-border bg-surface shadow-sm">
                <div className="grid grid-cols-[7rem_1fr] gap-4 p-4 sm:grid-cols-[9rem_1fr]">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-card bg-surface-muted">
                    {product.images[0] ? <Image src={product.images[0].url} alt={product.images[0].alt} fill unoptimized sizes="144px" className="object-contain" /> : null}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2"><Badge variant={statusVariants[status]}>{statusLabels[status]}</Badge><span className="type-caption">{product.brand}</span></div>
                    <h2 className="type-card-title mt-3">{product.title}</h2>
                    <p className="type-caption mt-2">{product.images.length} תמונות · {product.price === undefined ? "מחיר לא זמין" : `₪${product.price}`}</p>
                    <a href={product.productUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex text-xs font-semibold text-primary hover:underline">לצפייה במקור</a>
                  </div>
                </div>
                <div className="border-t border-border p-4">
                  <p className="mb-3 text-sm font-semibold">סטטוס המוצר</p>
                  <StatusActions sourceId={product.sourceId} externalProductId={product.externalId} />
                </div>
                <details className="border-t border-border">
                  <summary className="cursor-pointer px-4 py-4 text-sm font-semibold">ניהול {product.images.length} התמונות</summary>
                  <div className="grid gap-4 border-t border-border p-4 sm:grid-cols-2">
                    {product.images.map((image) => {
                      const imageStatus = imageStatuses.get(image.id) ?? "pending";
                      return (
                        <section key={image.id} className="rounded-card border border-border p-3">
                          <div className="relative aspect-[3/4] overflow-hidden rounded-card bg-surface-muted">
                            <Image src={image.url} alt={image.alt} fill unoptimized sizes="(max-width: 639px) 100vw, 240px" className="object-contain" />
                          </div>
                          <div className="my-3 flex items-center justify-between gap-2"><Badge variant={statusVariants[imageStatus]}>{statusLabels[imageStatus]}</Badge><span className="type-caption truncate" title={image.id}>{image.id.split(":").at(-1)}</span></div>
                          <StatusActions sourceId={product.sourceId} externalProductId={product.externalId} imageId={image.id} />
                        </section>
                      );
                    })}
                  </div>
                </details>
              </article>
            );
          })}
        </section>
        {filtered.length === 0 ? <p className="mt-12 rounded-card border border-border bg-surface p-8 text-center text-muted">אין מוצרים במסנן שנבחר.</p> : null}
      </PageContainer>
    </main>
  );
}

