import type { MouseEventHandler, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  controls?: string;
  expanded?: boolean;
  label?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  pressed?: boolean;
  variant?: "standard" | "choice";
};

export function Button({
  children,
  controls,
  expanded,
  label,
  onClick,
  pressed,
  variant = "standard",
}: ButtonProps) {
  return (
    <button
      aria-controls={controls}
      aria-expanded={expanded}
      aria-label={label}
      aria-pressed={pressed}
      className="ui-button"
      data-variant={variant}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
