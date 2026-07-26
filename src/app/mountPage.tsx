import { StrictMode, type ReactNode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { applyThemePreference, readThemePreference } from "../ui/theme";

export function mountPage(page: ReactNode): void {
  applyThemePreference(readThemePreference());

  const rootElement = document.getElementById("root");

  if (!rootElement) {
    throw new Error("Root element not found");
  }

  const application = <StrictMode>{page}</StrictMode>;

  if (rootElement.hasChildNodes()) {
    hydrateRoot(rootElement, application);
  } else {
    createRoot(rootElement).render(application);
  }
}
