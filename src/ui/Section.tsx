import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  id: string;
  labelledBy: string;
};

export function Section({ children, id, labelledBy }: SectionProps) {
  return (
    <section aria-labelledby={labelledBy} className="ui-section" id={id}>
      {children}
    </section>
  );
}
