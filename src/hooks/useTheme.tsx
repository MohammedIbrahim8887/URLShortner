import { ReactNode, createContext, useContext, useState } from "react";

export const useTheme = () => {
  return useContext(ThemeContext);
};

interface Theme {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<Theme>({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<string>("light");
  const toggleTheme = (): void => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
