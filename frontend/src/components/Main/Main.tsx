import React from 'react';
import Header from '../Header/Header';
import { styled } from '@mui/material/styles';

type HeaderProps = {
    title: string;
    handleClick: () => void;
    buttonText: string;
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const Main = ({ 
  children, 
  title, 
  handleClick, 
  buttonText, 
  searchValue, 
  setSearchValue } : { children: React.ReactNode } & HeaderProps) => {
  const Box = styled('div')(({ theme }) => ({
    padding: '20px',
    [theme.breakpoints.up('md')]: {
      padding: '50px',
    },
  }));
    
  return (
    <Box>
      <Header 
        title={title} 
        handleClick={handleClick} 
        buttonText={buttonText} 
        searchValue={searchValue} 
        setSearchValue={setSearchValue} />
      <main>{children}</main>
    </Box>
  );
};

export default Main;