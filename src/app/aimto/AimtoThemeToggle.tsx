"use client";

import { useEffect, useState } from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Monitor, Moon, Sun } from "lucide-react";
import styles from "./page.module.css";

type ThemePreference = "system" | "light" | "dark";
type ResolvedTheme = "light" | "dark";

const THEME_KEY = "aimto-theme-preference";

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getSavedPreference(): ThemePreference {
  if (typeof window === "undefined") {
    return "system";
  }

  const saved = window.localStorage.getItem(THEME_KEY);
  if (saved === "light" || saved === "dark" || saved === "system") {
    return saved;
  }

  return "system";
}

function resolveTheme(preference: ThemePreference): ResolvedTheme {
  if (preference === "system") {
    return getSystemTheme();
  }

  return preference;
}

function applyResolvedTheme(theme: ResolvedTheme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

function preferenceLabel(preference: ThemePreference, resolved: ResolvedTheme) {
  switch (preference) {
    case "light":
      return "Light theme";
    case "dark":
      return "Dark theme";
    case "system":
      return `System theme (${resolved})`;
    default: {
      const _exhaustive: never = preference;
      return _exhaustive;
    }
  }
}

type AimtoThemeToggleProps = {
  className?: string;
};

export default function AimtoThemeToggle({ className }: AimtoThemeToggleProps) {
  const [preference, setPreference] = useState<ThemePreference>("system");
  const [theme, setTheme] = useState<ResolvedTheme>("dark");
  const [themeReady, setThemeReady] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const syncFromPreference = (next: ThemePreference) => {
      const resolved = resolveTheme(next);
      applyResolvedTheme(resolved);
      setPreference(next);
      setTheme(resolved);
      setThemeReady(true);
    };

    syncFromPreference(getSavedPreference());

    const onSystemChange = () => {
      const currentPreference = getSavedPreference();
      if (currentPreference === "system") {
        const resolved = getSystemTheme();
        applyResolvedTheme(resolved);
        setTheme(resolved);
      }
    };

    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
  }, []);

  const onPreferenceChange = (value: string) => {
    if (value !== "light" && value !== "dark" && value !== "system") {
      return;
    }

    window.localStorage.setItem(THEME_KEY, value);
    const resolved = resolveTheme(value);
    applyResolvedTheme(resolved);
    setPreference(value);
    setTheme(resolved);
    setThemeReady(true);
  };

  return (
    <ToggleGroup.Root
      aria-label={
        themeReady ? preferenceLabel(preference, theme) : "Color theme"
      }
      className={`${styles.themeToggleGroup}${className ? ` ${className}` : ""}`}
      onValueChange={onPreferenceChange}
      type="single"
      value={preference}
    >
      <ToggleGroup.Item
        aria-label="Light theme"
        className={styles.themeToggleItem}
        title="Light"
        value="light"
      >
        <Sun size={14} strokeWidth={2.2} />
      </ToggleGroup.Item>
      <ToggleGroup.Item
        aria-label="System theme"
        className={styles.themeToggleItem}
        title="System"
        value="system"
      >
        <Monitor size={14} strokeWidth={2.2} />
      </ToggleGroup.Item>
      <ToggleGroup.Item
        aria-label="Dark theme"
        className={styles.themeToggleItem}
        title="Dark"
        value="dark"
      >
        <Moon size={14} strokeWidth={2.2} />
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}
