import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { storageService } from "../services/storage/storage.service";
import { PersistenceStorageKey } from "../services/storage/PersistenceStorageKey";
import { useMediaQuery } from "../hooks/useMediaQuery";

type Theme = "light" | "dark";

const applyTheme = (value: Theme) => {
  document.documentElement.setAttribute("data-theme", value);
};

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Detect system dark mode
  const isSystemDark = useMediaQuery("(prefers-color-scheme: dark)");

  const [theme, setThemeState] = useState<Theme>(() => {
    const storedTheme = storageService.get<Theme>(
      "local",
      PersistenceStorageKey.THEME
    );
    if (storedTheme) return storedTheme;
    return isSystemDark ? "dark" : "light";
  });

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = (value: Theme) => {
    setThemeState(value);

    storageService.set(
      "local",
      PersistenceStorageKey.THEME,
      value
    );

    applyTheme(value);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
};

