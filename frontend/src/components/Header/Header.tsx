import { AddBoxOutlined } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SearchBar } from '../SearchBar/SearchBar';
import { darkBlue } from '../../App';

type HeaderProps = {
    title: string;
    handleClick: () => void;
    buttonText: string;
}

const Header = ({ title, handleClick, buttonText }: HeaderProps) => {
  const mobileBreakpoint = useMediaQuery('(max-width:500px)');
  const tabletBreakpoint = useMediaQuery('(max-width:900px)');

  return (
    <header style={ !tabletBreakpoint ? { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' } : undefined}>
      <h1 style={{ fontSize: '48px', marginTop: 0 }}>{title}</h1>
      <Stack direction={mobileBreakpoint ? 'column' : 'row'} spacing={2} paddingBottom="16px" justifyContent="flex-end">
        <SearchBar />
        <Button 
          sx={{ background: darkBlue, fontWeight: 'bold' }}
          variant='contained' 
          onClick={handleClick} 
          startIcon={<AddBoxOutlined />}>{buttonText}</Button>
      </Stack>
    </header>
  );
};

export default Header;