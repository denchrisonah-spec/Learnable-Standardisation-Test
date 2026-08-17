import "./Icon.css";

/**
 * Renders one of the SVG icons exported from Figma (public/icons).
 *
 * The files are already-optimised vectors, so they're loaded as plain images
 * rather than inlined as components.
 */
export function Icon({
  name,
  size = 16,
  className = "",
  alt = "",
}: {
  name: string;
  size?: number;
  className?: string;
  alt?: string;
}) {
  return (
    <img
      src={`/icons/${name}.svg`}
      alt={alt}
      width={size}
      height={size}
      className={`icon ${className}`.trim()}
      style={{ width: size, height: size }}
      aria-hidden={alt === "" ? true : undefined}
    />
  );
}
