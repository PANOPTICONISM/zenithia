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

  const wrapperBoxBaseStyles = {
    display: "flex",
    flexDirection: "column",
    height: tabletBreakpoint ? "auto" : "100vh",
    padding: tabletBreakpoint ? "20px" : "50px",
    ...(!tabletBreakpoint && {
      width: open ? `calc(100% - (${drawerWidth}px))` : "calc(100% - 125px)"
    })
  };

  return (
    <Box
      sx={
        !tabletBreakpoint
          ? {
              display: "flex",
              justifyContent: "space-between"
            }
          : {}
      }>
      <Sidebar />
      <Box sx={wrapperBoxBaseStyles}>
        <Header
          title={title}
          handleClick={handleClick}
          buttonText={buttonText}
          isSearch={isSearch}
          hideMargin={hideMargin}
        />
        {children}
      </Box>
    </Box>
  );
};

export default Main;
