import { createTheme } from "@mui/material/styles";

/**
 * Portfolio colour palette.
 * black  → primary background
 * brown  → secondary sections / cards
 * sienna → borders, accents, highlighted components
 * cream  → primary text and highlights
 */
export const palette = {
  black: "#000000",
  brown: "#1F150C",
  sienna: "#412D15",
  cream: "#E1DCC9",
} as const;

/** Semi-transparent tints used for the glassmorphism surfaces. */
export const glassTints = {
  subtle: "rgba(225, 220, 201, 0.03)",
  soft: "rgba(225, 220, 201, 0.05)",
  border: "rgba(65, 45, 21, 0.55)",
  borderHover: "rgba(225, 220, 201, 0.35)",
} as const;

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: palette.cream,
      contrastText: palette.black,
    },
    secondary: {
      main: palette.sienna,
      contrastText: palette.cream,
    },
    background: {
      default: palette.black,
      paper: palette.brown,
    },
    text: {
      primary: palette.cream,
      secondary: "rgba(225, 220, 201, 0.68)",
      disabled: "rgba(225, 220, 201, 0.4)",
    },
    divider: glassTints.border,
    success: { main: "#9CCC9C" },
    error: { main: "#E57373" },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily:
      'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: { fontWeight: 800, letterSpacing: "-0.02em" },
    h2: { fontWeight: 700, letterSpacing: "-0.01em" },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    button: { fontWeight: 600, textTransform: "none", letterSpacing: "0.02em" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: "smooth",
        },
        "::selection": {
          backgroundColor: palette.sienna,
          color: palette.cream,
        },
        scrollbarColor: `${palette.sienna} ${palette.black}`,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: false,
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
