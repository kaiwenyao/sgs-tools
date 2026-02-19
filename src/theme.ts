import { alpha, createTheme } from "@mui/material/styles";

const bodyFont =
  "'Noto Sans SC', 'Source Han Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif";

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
        root: {
          border: "1px solid #D9E2E8",
          boxShadow: "0 6px 16px rgba(15, 23, 42, 0.05)",
        },
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
        root: {
          borderRadius: 16,
          border: "1px solid #D9E2E8",
          backgroundColor: alpha("#FFFFFF", 0.96),
          boxShadow: "0 8px 20px rgba(15, 23, 42, 0.12)",
        },
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
            fontSize: "0.78rem",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            backgroundColor: "#FFFFFF",
            "& fieldset": {
              borderColor: "#D6DEE5",
            },
            "&:hover fieldset": {
              borderColor: "#9AA9B5",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#0F766E",
              borderWidth: 2,
            },
          },
        },
      },
    },
  },
});
