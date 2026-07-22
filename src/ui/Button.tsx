import type { MouseEventHandler, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  controls?: string;
  expanded?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  pressed?: boolean;
  variant?: "standard" | "choice";
};

export function Button({
  children,
  controls,
  expanded,
  onClick,
  pressed,
  variant = "standard",
}: ButtonProps) {
  return (
    <button
      aria-controls={controls}
      aria-expanded={expanded}
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
