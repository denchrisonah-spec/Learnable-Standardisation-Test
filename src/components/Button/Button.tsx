import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import "./Button.css";

type Variant = "outline" | "solid";

const classes = (variant: Variant, className: string) =>
  `btn btn--${variant} ${className}`.trim();

export function Button({
  variant = "outline",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button type="button" className={classes(variant, className)} {...props} />
  );
}

export function ButtonLink({
  variant = "outline",
  className = "",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant }) {
  return <a className={classes(variant, className)} {...props} />;
}
