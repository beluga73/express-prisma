// src/theme.ts
import { createTheme } from "@mui/material/styles";

export const getThemeOptions = (mode: "light" | "dark") => {
  return createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: { main: "#4f46e5" },
            background: { default: "#f8fafc", paper: "#ffffff" },
            text: { primary: "#0f172a", secondary: "#64748b" },
            divider: "#e2e8f0",
          }
        : {
            primary: { main: "#06b6d4" },
            background: { default: "#0f172a", paper: "#1e293b" },
            text: { primary: "#f8fafc", secondary: "#94a3b8" },
            divider: "#334155",
          }),
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
          },
        },
      },
      MuiCard: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: ({ theme }) => ({
            border: `1px solid ${theme.palette.divider}`,
          }),
        },
      },
    },
  });
};
