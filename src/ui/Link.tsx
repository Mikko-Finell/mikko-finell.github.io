import type { ComponentPropsWithoutRef } from "react";

type LinkProps = Omit<ComponentPropsWithoutRef<"a">, "className" | "style"> & {
  variant?: "standard" | "navigation" | "section-navigation" | "identity";
};

export function Link({ variant = "standard", ...props }: LinkProps) {
  return <a className="ui-link" data-variant={variant} {...props} />;
}
