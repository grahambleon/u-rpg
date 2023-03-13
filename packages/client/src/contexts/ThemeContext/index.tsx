import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

export type ThemeContextType = {
  theme?: ThemeKey;
  changeTheme?: () => void;
};

export type ThemeProviderProps = {
  children?: ReactNode;
};

export const ThemeContext = createContext<ThemeContextType>({});

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeKey>("dark");

  const changeTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{ changeTheme, theme: theme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  if (!ThemeContext) {
    throw new Error("ThemeContext must be defined!");
  }
  return useContext<ThemeContextType>(ThemeContext);
}
