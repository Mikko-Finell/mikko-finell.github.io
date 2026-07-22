import type { ReactNode } from "react";

type HeadingProps = {
  children: ReactNode;
  id?: string;
  level: 1 | 2;
  size: "title" | "section";
};

export function Heading({ children, id, level, size }: HeadingProps) {
  const Element = `h${level}` as const;

  return (
    <Element className="ui-heading" data-size={size} id={id}>
      {children}
    </Element>
  );
}
