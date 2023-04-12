import { AddBoxOutlined } from '@mui/icons-material';
import { Button, Stack, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSearchBar } from '../../contexts/SearchBarProvider';

type HeaderProps = {
    title: string;
    handleClick: () => void;
    buttonText: string;
}

const SearchBar = () => {
  const [searchValue, setSearchValue] = useSearchBar();

  return (
    <TextField
      size='small'
      id="search"
      type="search"
      label="Search"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
    />
  );
};

const Header = ({ title, handleClick, buttonText }: HeaderProps) => {
  const mobileBreakpoint = useMediaQuery('(max-width:400px)');

  const Header = styled('header')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    },
  }));

  return (
    <Header>
      <h1 style={{ fontSize: '48px', marginTop: 0 }}>{title}</h1>
      <Stack direction={mobileBreakpoint ? 'column' : 'row'} spacing={2} paddingBottom="16px" justifyContent="flex-end">
        <SearchBar />
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