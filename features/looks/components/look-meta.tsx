type LookMetaProps = { productCount: number };

export function LookMeta({ productCount }: LookMetaProps) {
  const label = productCount === 1 ? "פריט אחד בלוק" : `${productCount} פריטים בלוק`;
  return <p className="type-caption">{label}</p>;
}
