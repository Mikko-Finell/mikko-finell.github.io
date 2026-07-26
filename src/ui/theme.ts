export const colorModes = ["system", "light", "dark"] as const;

export type ColorMode = (typeof colorModes)[number];

const modeStorageKey = "cv-color-mode";

function isColorMode(value: string | null): value is ColorMode {
  return colorModes.some((mode) => mode === value);
}

export function readThemePreference(): ColorMode {
  if (typeof window === "undefined") {
    return "system";
  }

  try {
    const storedMode = window.localStorage.getItem(modeStorageKey);

    return isColorMode(storedMode) ? storedMode : "system";
  } catch {
    return "system";
  }
}

export function applyThemePreference(mode: ColorMode) {
  document.documentElement.dataset.mode = mode;
  document.documentElement.style.colorScheme =
    mode === "system" ? "light dark" : mode;
}

export function storeThemePreference(mode: ColorMode) {
  try {
    window.localStorage.setItem(modeStorageKey, mode);
  } catch {}

  applyThemePreference(mode);
}
