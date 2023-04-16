import React from 'react';
import Header from '../Header/Header';
import { Box, useMediaQuery } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import { drawerWidth } from '../Sidebar/Sidebar.utils';

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
    
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Sidebar />
      <Box sx={{ padding: tabletBreakpoint ? '20px' : '50px', width: `calc(100% - (160px + ${drawerWidth}px))` }}>
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