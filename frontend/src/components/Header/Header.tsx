import { AddBoxOutlined } from '@mui/icons-material';
import { Box, Button, TextField } from '@mui/material';
import React from 'react';

type HeaderProps = {
    title: string;
    handleClick: () => void;
    buttonText: string;
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const Header = ({ title, handleClick, buttonText, searchValue, setSearchValue }: HeaderProps) => {
  const handleChange = (event: { target: { value: string; }; }) => {
    setSearchValue(event.target.value);
  };
  
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <h1 style={{ fontSize: '48px' }}>{title}</h1>
      <Box sx={{ maxHeight: '37px', }}>
        <TextField
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
      </Box>
    </header>
  );
};

export default Header;