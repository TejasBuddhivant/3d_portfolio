import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UiState {
  /** Section id currently in view (drives the navbar indicator). */
  activeSection: string;
  mobileNavOpen: boolean;
}

const initialState: UiState = {
  activeSection: "home",
  mobileNavOpen: false,
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
  },
});

export const { setActiveSection, openMobileNav, closeMobileNav } =
  uiSlice.actions;

export default uiSlice.reducer;
