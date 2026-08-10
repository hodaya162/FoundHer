import { ExternalLink } from "lucide-react";

import { buttonVariants } from "@/components/ui";
import type { ProductType } from "@/domain/product";
import { FavoriteButton } from "@/features/favorites";
import { cn } from "@/lib/utils";

type PurchaseActionBarProps = {
  externalUrl?: string;
  productId: string;
  productName: string;
  type: "purchase";
};

type RentalActionBarProps = {
  availabilityUrl?: string;
  productId: string;
  productName: string;
  type: Exclude<ProductType, "purchase">;
};

export type ProductActionBarProps = PurchaseActionBarProps | RentalActionBarProps;

export function ProductActionBar(props: ProductActionBarProps) {
  const href = props.type === "purchase" ? props.externalUrl : props.availabilityUrl;
  const label = props.type === "purchase" ? "לאתר המותג" : "לבדיקת זמינות";
  const unavailableMessage = props.type === "purchase"
    ? "קישור רכישה מאומת עדיין אינו זמין לפריט הדוגמה הזה."
    : "פרטי קשר מאומתים עדיין אינם זמינים לפריט ההשכרה לדוגמה הזה.";

  return (
    <div aria-label={`פעולות עבור ${props.productName}`} className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ size: "lg" }), "w-full")}>
          {label}
          <ExternalLink aria-hidden="true" className="size-4" />
        </a>
      ) : (
        <p className="type-body-small rounded-button border border-border bg-surface-muted px-4 py-3 text-muted">
          {unavailableMessage}
        </p>
      )}
      <FavoriteButton reference={{ entityType: "product", entityId: props.productId }} entityLabel={props.productName} variant="label" />
    </div>
  );
}
