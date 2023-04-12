import { AddBoxOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';

type HeaderProps = {
    title: string;
    handleClick: () => void;
    buttonText: string;
}

const Header = ({ title, handleClick, buttonText }: HeaderProps) => {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <h1 style={{ fontSize: '48px' }}>{title}</h1>
      <Button 
        sx={{ maxHeight: '37px', background: '#1F2C4F', fontWeight: 'bold' }}
        variant='contained' 
        onClick={handleClick} 
        startIcon={<AddBoxOutlined />}>{buttonText}</Button>
    </header>
  );
};

export default Header;