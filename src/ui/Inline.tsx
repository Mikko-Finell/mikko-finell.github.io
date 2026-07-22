import type { ReactNode } from "react";

type InlineProps = {
  align?: "start" | "center";
  children: ReactNode;
  gap?: "small" | "medium";
};

export function Inline({
  align = "start",
  children,
  gap = "medium",
}: InlineProps) {
  return (
    <div className="ui-inline" data-align={align} data-gap={gap}>
      {children}
    </div>
  );
}
