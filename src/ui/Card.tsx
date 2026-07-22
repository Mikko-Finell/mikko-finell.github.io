import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  labelledBy: string;
};

export function Card({ children, labelledBy }: CardProps) {
  return (
    <article aria-labelledby={labelledBy} className="ui-card">
      {children}
    </article>
  );
}
