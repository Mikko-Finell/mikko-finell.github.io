import { useState } from "react";
import { Button } from "./Button";
import { Inline } from "./Inline";
import {
  type ColorMode,
  colorModes,
  readThemePreference,
  storeThemePreference,
} from "./theme";

const modeLabels: Record<ColorMode, string> = {
  system: "System",
  light: "Light",
  dark: "Dark",
};

export function ThemeControls() {
  const initialPreference = readThemePreference();
  const [mode, setMode] = useState<ColorMode>(initialPreference);

  function selectMode(nextMode: ColorMode) {
    setMode(nextMode);
    storeThemePreference(nextMode);
  }

  return (
    <div className="theme-controls">
      <fieldset className="theme-controls__group">
        <legend className="theme-controls__label">Mode</legend>
        <Inline gap="small">
          {colorModes.map((option) => (
            <Button
              key={option}
              onClick={() => selectMode(option)}
              aria-pressed={mode === option}
              variant="choice"
            >
              {modeLabels[option]}
            </Button>
          ))}
        </Inline>
      </fieldset>
    </div>
  );
}
