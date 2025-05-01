import { createTheme } from "@mui/material";

export const theme = createTheme();

theme.typography.h1 = {
  fontFamily: "'Bungee Outline', cursive",
  fontSize: "2rem",
  "@media (min-width:500px)": {
    fontSize: "3.8rem"
  }
};
