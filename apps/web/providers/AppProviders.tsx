"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import StoreProvider from "./StoreProvider";
import ThemeModeProvider from "./ThemeModeProvider";

/**
 * Single client boundary that wires up:
 * Emotion SSR cache → Redux store → mode-aware MUI theme → global baseline.
 */
export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppRouterCacheProvider options={{ key: "mui", enableCssLayer: true }}>
      <StoreProvider>
        <ThemeModeProvider>{children}</ThemeModeProvider>
      </StoreProvider>
    </AppRouterCacheProvider>
  );
}
