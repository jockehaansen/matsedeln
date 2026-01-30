import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, GlobalStyles } from "@mui/material";

import App from "./App";
import { theme } from "./shared/theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles="@layer theme, base, multi, mui, components, utilities;" />
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </StrictMode>,
);
