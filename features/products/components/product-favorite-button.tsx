import { FavoriteButton } from "@/features/favorites";

export type ProductFavoriteButtonProps = {
  productId: string;
  productName: string;
  className?: string;
};

export function ProductFavoriteButton({ className, productId, productName }: ProductFavoriteButtonProps) {
  return (
    <FavoriteButton
      reference={{ entityType: "product", entityId: productId }}
      entityLabel={productName}
      className={className ?? "absolute end-3 top-3 z-[var(--z-base)] border-white/70 bg-white/90 shadow-sm hover:bg-white"}
    />
  );
}
