import { CssBaseline, ThemeProvider } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TagManager from "react-gtm-module";
import App from "./App.tsx";
import { theme } from "./contexts/ThemeProvider.tsx";
import { UserProvider } from "./contexts/UserProvider.tsx";
import "./index.css";

const tagManagerArgs = {
  gtmId: "GTM-NM4FZ9KR"
};

TagManager.initialize(tagManagerArgs);

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
