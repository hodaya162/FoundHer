export type ProductCardMetaProps = {
  sellerName: string;
  detail: string;
};

export function ProductCardMeta({ detail, sellerName }: ProductCardMetaProps) {
  return (
    <div className="type-caption flex min-w-0 items-center justify-between gap-2">
      <span className="min-w-0 truncate" title={sellerName}>{sellerName}</span>
      {detail ? <span className="min-w-0 truncate text-start" title={detail}>{detail}</span> : null}
    </div>
  );
}
