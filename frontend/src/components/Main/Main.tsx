import React from 'react';
import Header from '../Header/Header';
import { Box, useMediaQuery } from '@mui/material';

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
    <Box sx={{ padding: tabletBreakpoint ? '20px' : '50px' }}>
      <Header 
        title={title} 
        handleClick={handleClick} 
        buttonText={buttonText} />
      <main>{children}</main>
    </Box>
  );
};

export default Main;