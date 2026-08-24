import { createTheme, type Theme } from "@mui/material/styles";

/**
 * Portfolio colour tokens — dark mode.
 * black  → primary background (pure black)
 * brown  → card / section surfaces (lifted so cards separate from black)
 * sienna → vivid caramel — borders, accents, decorative highlights
 * amber  → signature accent — CTAs, links, hover glows
 * cream  → primary text and highlights
 */
export const palette = {
  black: "#000000",
  brown: "#221809",
  sienna: "#C97E2F",
  amber: "#FFB627",
  cream: "#F6F1E3",
} as const;

/** Light-mode counterparts. Accents are darkened so they keep AA contrast on white. */
export const lightPalette = {
  white: "#F7F4EC",
  paper: "#FFFFFF",
  caramel: "#B45309",
  coffee: "#7C4A12",
  black: "#000000",
} as const;

/** Semi-transparent tints used for the glassmorphism surfaces (dark mode). */
export const glassTints = {
  subtle: "rgba(246, 241, 227, 0.05)",
  soft: "rgba(246, 241, 227, 0.09)",
  border: "rgba(201, 126, 47, 0.38)",
  borderHover: "rgba(255, 182, 39, 0.85)",
} as const;

/** Glassmorphism tints recalibrated for light surfaces. */
export const lightGlassTints = {
  subtle: "rgba(0, 0, 0, 0.03)",
  soft: "rgba(0, 0, 0, 0.06)",
  border: "rgba(180, 83, 9, 0.38)",
  borderHover: "rgba(180, 83, 9, 0.85)",
} as const;

export type ThemeMode = "dark" | "light";

/** Typography rules shared by every mode so text rhythm never shifts on toggle. */
const typography = {
  fontFamily:
    'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  h1: { fontWeight: 800, letterSpacing: "-0.02em" },
  h2: { fontWeight: 700, letterSpacing: "-0.01em" },
  h3: { fontWeight: 700 },
  h4: { fontWeight: 600 },
  h5: { fontWeight: 600 },
  button: { fontWeight: 600, textTransform: "none", letterSpacing: "0.02em" },
} as const;

/**
 * Builds the MUI theme for a colour mode.
 *
 * Dark keeps the signature black + amber identity with soft rounded surfaces;
 * light uses an off-white canvas, pure-black text and sharp square corners.
 */
export function createAppTheme(mode: ThemeMode): Theme {
  const isLight = mode === "light";

  return createTheme({
    palette: {
      mode,
      primary: isLight
        ? { main: lightPalette.caramel, contrastText: "#FFFFFF" }
        : { main: palette.amber, contrastText: palette.black },
      secondary: isLight
        ? { main: lightPalette.coffee, contrastText: "#FFFFFF" }
        : { main: palette.sienna, contrastText: palette.black },
      background: isLight
        ? { default: lightPalette.white, paper: lightPalette.paper }
        : { default: palette.black, paper: palette.brown },
      text: isLight
        ? {
            primary: lightPalette.black,
            secondary: "rgba(0, 0, 0, 0.66)",
            disabled: "rgba(0, 0, 0, 0.38)",
          }
        : {
            primary: palette.cream,
            secondary: "rgba(246, 241, 227, 0.74)",
            disabled: "rgba(246, 241, 227, 0.45)",
          },
      divider: isLight ? "rgba(0, 0, 0, 0.14)" : glassTints.border,
      success: { main: isLight ? "#15803D" : "#69DB7C" },
      error: { main: isLight ? "#DC2626" : "#FF6B6B" },
      info: { main: isLight ? "#0369A1" : "#4FC3F7" },
      warning: { main: isLight ? lightPalette.caramel : palette.amber },
    },
    shape: {
      // Sharp, square corners for the editorial light look; soft for dark.
      borderRadius: isLight ? 0 : 14,
    },
    typography,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            scrollBehavior: "smooth",
          },
          "::selection": {
            backgroundColor: palette.amber,
            color: palette.black,
          },
          scrollbarColor: isLight
            ? "rgba(0, 0, 0, 0.35) transparent"
            : `${palette.sienna} ${palette.black}`,
        },
      },
      MuiButtonBase: {
        defaultProps: {
          disableRipple: false,
        },
        styleOverrides: {
          root: {
            // High-visibility keyboard focus ring — helps older users navigate.
            "&.Mui-focusVisible": {
              outline: "2px solid",
              outlineColor: isLight ? lightPalette.caramel : palette.amber,
              outlineOffset: 3,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
    },
  });
}

export const darkTheme = createAppTheme("dark");
export const lightTheme = createAppTheme("light");
