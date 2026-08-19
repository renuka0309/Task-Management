"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark";
type Color = "Amber" | "Blue" | "Pink" | "Rose" | "Emerald" | "Black";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  color: Color;
  setColor: (color: Color) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

const COLOR_HEX: Record<Color, string> = {
  Amber: "#F59E0B",
  Blue: "#7C3AED",
  Pink: "#EC4899",
  Rose: "#F43F5E",
  Emerald: "#10B981",
  Black: "#171717",
};

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return (localStorage.getItem("theme") as Theme) || "light";
}

function getInitialColor(): Color {
  if (typeof window === "undefined") return "Blue";
  return (localStorage.getItem("color") as Color) || "Blue";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [color, setColorState] = useState<Color>(getInitialColor);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.setProperty("--accent-color", COLOR_HEX[color]);
  }, [theme, color]);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem("theme", t);
  };

  const setColor = (c: Color) => {
    setColorState(c);
    localStorage.setItem("color", c);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, color, setColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export { COLOR_HEX };
export type { Color, Theme };