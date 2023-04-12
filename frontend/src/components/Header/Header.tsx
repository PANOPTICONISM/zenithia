import { AddBoxOutlined } from '@mui/icons-material';
import { Button, Stack, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

type HeaderProps = {
    title: string;
    handleClick: () => void;
    buttonText: string;
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const Header = ({ title, handleClick, buttonText, searchValue, setSearchValue }: HeaderProps) => {
  const mobileBreakpoint = useMediaQuery('(max-width:400px)');


  const handleChange = (event: { target: { value: string; }; }) => {
    setSearchValue(event.target.value);
  };

  const Header = styled('header')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    },
  }));
  
  return (
    <Header>
      <h1 style={{ fontSize: '48px' }}>{title}</h1>
      <Stack direction={mobileBreakpoint ? 'column' : 'row'} spacing={2} paddingBottom="16px" justifyContent="flex-end">
        <TextField
          size='small'
          id="search"
          type="search"
          label="Search"
          value={searchValue}
          onChange={handleChange}
        />
        <Button 
          sx={{ background: '#1F2C4F', fontWeight: 'bold' }}
          variant='contained' 
          onClick={handleClick} 
          startIcon={<AddBoxOutlined />}>{buttonText}</Button>
      </Stack>
    </Header>
  );
};

export default Header;