export type ProductCardMetaProps = {
  sellerName: string;
  detail: string;
};

export function ProductCardMeta({ detail, sellerName }: ProductCardMetaProps) {
  return (
    <div className="type-caption flex items-center justify-between gap-3">
      <span>{sellerName}</span>
      <span>{detail}</span>
    </div>
  );
}
