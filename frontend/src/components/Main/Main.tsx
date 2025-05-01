import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import { useIsSidebarOpen } from "../../contexts/SidebarProvider";
import Header from "../Header/Header";
import { HeaderProps } from "../Header/Header.types";
import Sidebar from "../Sidebar/Sidebar";
import { drawerWidth } from "../Sidebar/Sidebar.utils";

const Main = ({
  children,
  title,
  handleClick,
  buttonText,
  isSearch,
  hideMargin
}: { children: React.ReactNode } & HeaderProps) => {
  const tabletBreakpoint = useMediaQuery("(max-width:900px)");
  const [open] = useIsSidebarOpen();

  return (
    <Box
      sx={
        !tabletBreakpoint
          ? { display: "flex", justifyContent: "space-between" }
          : {}
      }>
      <Sidebar />
      <Box
        sx={
          tabletBreakpoint
            ? { padding: "20px" }
            : {
                width: open
                  ? `calc(100% - (${drawerWidth}px))`
                  : "calc(100% - 125px)",
                padding: "50px"
              }
        }>
        <Header
          title={title}
          handleClick={handleClick}
          buttonText={buttonText}
          isSearch={isSearch}
          hideMargin={hideMargin}
        />
        <main>{children}</main>
      </Box>
    </Box>
  );
};

export default Main;
