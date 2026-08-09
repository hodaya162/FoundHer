import { ExternalLink, Share2 } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui";
import type { ProductType } from "@/domain/product";
import { FavoriteButton } from "@/features/favorites";
import { cn } from "@/lib/utils";

type PurchaseActionBarProps = {
  externalUrl: string;
  productId: string;
  productName: string;
  type: "purchase";
};

type RentalActionBarProps = {
  availabilityUrl: string;
  productId: string;
  productName: string;
  type: Exclude<ProductType, "purchase">;
};

export type ProductActionBarProps = PurchaseActionBarProps | RentalActionBarProps;

export function ProductActionBar(props: ProductActionBarProps) {
  const href = props.type === "purchase" ? props.externalUrl : props.availabilityUrl;
  const label = props.type === "purchase" ? "לאתר המותג" : "לבדיקת זמינות";

  return (
    <div aria-label={`פעולות עבור ${props.productName}`} className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
      <a href={href} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ size: "lg" }), "w-full")}>
        {label}
        <ExternalLink aria-hidden="true" className="size-4" />
      </a>
      <Button variant="secondary" size="lg" aria-label={`שיתוף ${props.productName}`}>
        <Share2 aria-hidden="true" className="size-4" />
        <span className="sm:sr-only">שיתוף</span>
      </Button>
      <FavoriteButton reference={{ entityType: "product", entityId: props.productId }} entityLabel={props.productName} variant="label" />
    </div>
  );
}
