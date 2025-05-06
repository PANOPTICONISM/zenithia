import * as amplitude from "@amplitude/analytics-browser";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { theme } from "./contexts/ThemeProvider.tsx";
import { UserProvider } from "./contexts/UserProvider.tsx";
import "./index.css";

amplitude.init(import.meta.env.VITE_AMPLITUDE_API_KEY, {
  autocapture: {
    elementInteractions: {
      pageUrlAllowlist: [new RegExp("https://zenithia.panopticonism.dev")]
    }
  },
  serverZone: "EU"
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </UserProvider>
  </StrictMode>
);
