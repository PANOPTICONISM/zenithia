import React from 'react';
import Header from '../Header/Header';
import { Box, useMediaQuery } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import { drawerWidth } from '../Sidebar/Sidebar.utils';
import { useIsSidebarOpen } from '../../contexts/SidebarProvider';

type HeaderProps = {
    title: string;
    handleClick: () => void;
    buttonText: string;
}

const Main = ({ 
  children, 
  title, 
  handleClick, 
  buttonText } : { children: React.ReactNode } & HeaderProps) => {
  const tabletBreakpoint = useMediaQuery('(max-width:900px)');
  const [open] = useIsSidebarOpen();
    
  return (
    <Box sx={ !tabletBreakpoint ? { display: 'flex', justifyContent: 'space-between' } : {}}>
      <Sidebar />
      <Box sx={tabletBreakpoint ? { padding: '20px' } : { width: open ? `calc(100% - (160px + ${drawerWidth}px))` : 'calc(100% - 225px)', padding: '50px' }}>
        <Header 
          title={title} 
          handleClick={handleClick} 
          buttonText={buttonText} />
        <main>{children}</main>
      </Box>
    </Box>
  );
};

export default Main;