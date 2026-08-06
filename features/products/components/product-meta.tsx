export type ProductMetaProps = {
  sellerName: string;
  detail: string;
};

export function ProductMeta({ detail, sellerName }: ProductMetaProps) {
  return (
    <div className="type-caption flex items-center justify-between gap-3">
      <span>{sellerName}</span>
      <span>{detail}</span>
    </div>
  );
}
