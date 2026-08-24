"use client";

import { useEffect, useMemo } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { createAppTheme } from "@/components/ui";
import { setThemeMode, useAppDispatch, useAppSelector } from "@/store";

const THEME_STORAGE_KEY = "portfolio.themeMode";

/**
 * Bridges Redux and MUI: the active `ui.themeMode` selects a memoised theme,
 * the visitor's choice is persisted to localStorage, and the saved preference
 * is restored after hydration (SSR always renders the dark default).
 */
export default function ThemeModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.ui.themeMode);
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  // Restore the visitor's saved preference once on mount.
  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "dark" || stored === "light") {
      dispatch(setThemeMode(stored));
    }
  }, [dispatch]);

  // Persist every explicit change.
  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
}
