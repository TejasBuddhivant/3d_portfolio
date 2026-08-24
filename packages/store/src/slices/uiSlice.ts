import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/** Colour scheme driving the MUI theme (consumed by ThemeModeProvider). */
export type ThemeMode = "dark" | "light";

export interface UiState {
  /** Section id currently in view (drives the navbar indicator). */
  activeSection: string;
  mobileNavOpen: boolean;
  themeMode: ThemeMode;
}

const initialState: UiState = {
  activeSection: "home",
  mobileNavOpen: false,
  // Dark is the brand default and matches the SSR render, avoiding hydration mismatches.
  themeMode: "dark",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActiveSection: (state, action: PayloadAction<string>) => {
      state.activeSection = action.payload;
    },
    openMobileNav: (state) => {
      state.mobileNavOpen = true;
    },
    closeMobileNav: (state) => {
      state.mobileNavOpen = false;
    },
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload;
    },
    toggleThemeMode: (state) => {
      state.themeMode = state.themeMode === "dark" ? "light" : "dark";
    },
  },
});

export const {
  setActiveSection,
  openMobileNav,
  closeMobileNav,
  setThemeMode,
  toggleThemeMode,
} = uiSlice.actions;

export default uiSlice.reducer;
