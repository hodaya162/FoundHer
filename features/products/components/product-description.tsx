export type ProductDescriptionProps = {
  description: string;
};

export function ProductDescription({ description }: ProductDescriptionProps) {
  return <p className="type-body text-muted">{description}</p>;
}
