import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles/site.css";
import { applyThemePreference, readThemePreference } from "./ui/theme";

const initialThemePreference = readThemePreference();
applyThemePreference(initialThemePreference);

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
