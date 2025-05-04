import { createTheme } from "@mui/material";

export const theme = createTheme();

theme.typography.h1 = {
  fontFamily: "'Bungee Outline', cursive",
  fontSize: "2rem",
  [theme.breakpoints.up("sm")]: {
    fontSize: "3.4rem"
  }
};

theme.typography.h2 = {
  fontFamily: "'Bungee Outline', cursive",
  fontSize: "1.8rem",
  [theme.breakpoints.up("sm")]: {
    fontSize: "3.2rem"
  }
};
