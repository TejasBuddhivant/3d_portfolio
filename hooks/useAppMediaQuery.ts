"use client";

import { useMediaQuery, useTheme } from "@mui/material";

/**
 * Thin wrapper around MUI's `useMediaQuery` that always resolves against
 * the application theme so breakpoint logic lives in one place.
 */
export function useAppMediaQuery(): {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
} {
  const theme = useTheme();

  const isTablet = useMediaQuery(theme.breakpoints.up("sm"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isLargeDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  return {
    isMobile: !isTablet,
    isTablet,
    isDesktop,
    isLargeDesktop,
  };
}
