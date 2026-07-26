import { useSyncExternalStore, type ComponentPropsWithoutRef } from "react";

type ImageProps = Omit<
  ComponentPropsWithoutRef<"img">,
  "alt" | "className" | "style"
> & {
  alt: string;
};

type EffectiveTheme = "dark" | "light";

type ResponsiveImage = {
  height: number;
  width: number;
};

const responsiveImages: Record<string, ResponsiveImage> = {
  "/images/articles/tealab/report-generation-progress.light.png": {
    height: 1390,
    width: 2628,
  },
  "/images/articles/tealab/report-generation-progress.dark.png": {
    height: 1390,
    width: 2628,
  },
};

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

  const imageSource = getThemedSource(src, theme);
  const image = imageSource ? responsiveImages[imageSource] : undefined;
  const { height, loading = "lazy", width, ...imageProps } = props;

  return (
    <picture>
      {imageSource && image ? (
        <source
          sizes="(max-width: 52rem) calc(100vw - 2.5rem), 43rem"
          srcSet={`${imageSource.replace(".png", ".768.webp")} 768w, ${imageSource.replace(".png", ".1536.webp")} 1536w`}
          type="image/webp"
        />
      ) : null}
      <img
        alt={alt}
        className="ui-image"
        decoding="async"
        height={height ?? image?.height}
        loading={loading}
        src={imageSource}
        width={width ?? image?.width}
        {...imageProps}
      />
    </picture>
  );
}
