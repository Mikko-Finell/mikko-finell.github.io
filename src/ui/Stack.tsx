import type { ReactNode } from "react";

type StackProps = {
  children: ReactNode;
  gap?: "small" | "medium" | "large";
};

export function Stack({ children, gap = "medium" }: StackProps) {
  return (
    <div className="ui-stack" data-gap={gap}>
      {children}
    </div>
  );
}
