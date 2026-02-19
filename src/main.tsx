import { createRoot } from "react-dom/client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index.tsx";
import { appTheme } from "./theme";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={appTheme}>
    <CssBaseline />
    <RouterProvider router={router} />
  </ThemeProvider>
);
