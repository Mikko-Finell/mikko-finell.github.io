import type { ReactNode } from "react";

type LinkProps = {
  children: ReactNode;
  href: string;
  variant?: "standard" | "navigation";
};

export function Link({ children, href, variant = "standard" }: LinkProps) {
  return (
    <a className="ui-link" data-variant={variant} href={href}>
      {children}
    </a>
  );
}
