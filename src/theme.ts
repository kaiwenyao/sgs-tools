import { alpha, createTheme } from "@mui/material/styles";
import type { CSSProperties } from "react";

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }
  interface TypographyVariants {
    display: CSSProperties;
    large: CSSProperties;
  }
  interface TypographyVariantsOptions {
    display?: CSSProperties;
    large?: CSSProperties;
  }
}
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    display: true;
    large: true;
  }
}

const bodyFont =
  "'Noto Sans SC', 'Source Han Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif";

export const typeScale = {
  display: "2.25rem",
  large: "1.7rem",
  body: "0.98rem",
  micro: "0.78rem",
} as const;

export const brandAlpha = (opacity: number) => alpha("#0F766E", opacity);

export const inkShadow = (opacity: number, y = 6, blur = 16) =>
  `0 ${y}px ${blur}px rgba(15, 23, 42, ${opacity})`;

export const appTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0F766E",
      light: "#14B8A6",
      dark: "#115E59",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#B45309",
      light: "#D97706",
      dark: "#92400E",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F3F6F8",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#0F172A",
      secondary: "#475569",
    },
    divider: "#D9E2E8",
    neutral: {
      main: "#64748B",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: bodyFont,
    h5: {
      fontWeight: 700,
      fontSize: "1.25rem",
      lineHeight: 1.3,
    },
    h6: {
      fontWeight: 700,
      fontSize: "1.06rem",
      lineHeight: 1.3,
    },
    subtitle1: {
      fontWeight: 700,
      fontSize: "1rem",
    },
    body1: {
      fontSize: "0.98rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.92rem",
      lineHeight: 1.55,
    },
    button: {
      fontWeight: 700,
      textTransform: "none",
      letterSpacing: "0.01em",
    },
    display: {
      fontSize: typeScale.display,
      lineHeight: 1.1,
      fontWeight: 700,
    },
    large: {
      fontSize: typeScale.large,
      lineHeight: 1.1,
      fontWeight: 700,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*, *::before, *::after": {
          boxSizing: "border-box",
        },
        html: {
          height: "100%",
        },
        body: {
          minHeight: "100%",
          margin: 0,
          fontFamily: bodyFont,
          color: "#0F172A",
          backgroundColor: "#F3F6F8",
          lineHeight: 1.5,
          WebkitFontSmoothing: "antialiased",
          textRendering: "optimizeLegibility",
        },
        "#root": {
          minHeight: "100vh",
        },
        "button, [role='button']": {
          touchAction: "manipulation",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: "1px solid",
          borderColor: theme.palette.divider,
          boxShadow: inkShadow(0.05, 6, 16),
        }),
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          minHeight: 44,
          borderRadius: 10,
          paddingInline: 14,
        },
        containedPrimary: {
          backgroundColor: "#0F766E",
          "&:hover": {
            backgroundColor: "#115E59",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 600,
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 16,
          border: "1px solid",
          borderColor: theme.palette.divider,
          backgroundColor: alpha("#FFFFFF", 0.96),
          boxShadow: inkShadow(0.12, 8, 20),
        }),
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          minWidth: 0,
          maxWidth: "none",
          minHeight: 56,
          color: "#4B5563",
          "&.Mui-selected": {
            color: "#0F766E",
          },
        },
        label: {
          fontWeight: 600,
          "&.Mui-selected": {
            fontSize: typeScale.micro,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            backgroundColor: "#FFFFFF",
            "& fieldset": {
              borderColor: theme.palette.divider,
            },
            "&:hover fieldset": {
              borderColor: "#9AA9B5",
            },
            "&.Mui-focused fieldset": {
              borderColor: theme.palette.primary.main,
              borderWidth: 2,
            },
          },
        }),
      },
    },
  },
});
