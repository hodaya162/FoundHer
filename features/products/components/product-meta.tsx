export type ProductMetaItem = { readonly label: string; readonly value: string };

export type ProductMetaProps = { items: readonly ProductMetaItem[] };

export function ProductMeta({ items }: ProductMetaProps) {
  return (
    <dl className="grid gap-3 border-t border-border pt-5 sm:grid-cols-2">
      {items.map(({ label, value }) => (
        <div key={label} className="space-y-1">
          <dt className="type-caption">{label}</dt>
          <dd className="type-body-small m-0">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
