import type { ComponentPropsWithoutRef } from "react";

type ButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "className" | "style"
> & {
  variant?: "standard" | "choice";
};

export function Button({
  type = "button",
  variant = "standard",
  ...props
}: ButtonProps) {
  return (
    <button
      className="ui-button"
      data-variant={variant}
      type={type}
      {...props}
    />
  );
}
