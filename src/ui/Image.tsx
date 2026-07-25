import { useSyncExternalStore, type ComponentPropsWithoutRef } from "react";

type ImageProps = Omit<
  ComponentPropsWithoutRef<"img">,
  "alt" | "className" | "style"
> & {
  alt: string;
};

type EffectiveTheme = "dark" | "light";

function getEffectiveTheme(): EffectiveTheme {
  const mode = document.documentElement.dataset.mode;

  if (mode === "dark") {
    return "dark";
  }

  if (mode === "light") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function subscribeToTheme(onChange: () => void) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const observer = new MutationObserver(onChange);

  observer.observe(document.documentElement, {
    attributeFilter: ["data-mode"],
    attributes: true,
  });
  mediaQuery.addEventListener("change", onChange);

  return () => {
    observer.disconnect();
    mediaQuery.removeEventListener("change", onChange);
  };
}

function getThemedSource(
  src: string | undefined,
  theme: EffectiveTheme,
): string | undefined {
  if (theme !== "dark" || !src) {
    return src;
  }

  return src.replace(/\.light(?=\.[^./?#]+(?:[?#]|$))/, ".dark");
}

export function Image({ alt, src, ...props }: ImageProps) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getEffectiveTheme,
    (): EffectiveTheme => "light",
  );

  return (
    <img
      alt={alt}
      className="ui-image"
      decoding="async"
      src={getThemedSource(src, theme)}
      {...props}
    />
  );
}
