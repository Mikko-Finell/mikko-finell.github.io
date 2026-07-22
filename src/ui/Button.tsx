import type { MouseEventHandler, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  controls?: string;
  expanded?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export function Button({ children, controls, expanded, onClick }: ButtonProps) {
  return (
    <button
      aria-controls={controls}
      aria-expanded={expanded}
      className="ui-button"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
