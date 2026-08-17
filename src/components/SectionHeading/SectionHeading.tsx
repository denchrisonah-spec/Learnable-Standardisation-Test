import "./SectionHeading.css";

/**
 * The centered eyebrow / title / description block that opens most sections
 * in the design ("Featured Products → BESTSELLER PRODUCTS → …").
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={`section-heading ${className}`.trim()}>
      {eyebrow && <p className="t-h4 section-heading__eyebrow">{eyebrow}</p>}
      <h2 className="t-h3 section-heading__title">{title}</h2>
      {description && (
        <p className="t-body section-heading__description">{description}</p>
      )}
    </div>
  );
}
