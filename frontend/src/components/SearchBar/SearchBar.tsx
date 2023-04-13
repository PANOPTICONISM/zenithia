import { TextField } from '@mui/material';
import { useSearchBar } from '../../contexts/SearchBarProvider';
import React from 'react';

export const SearchBar = () => {
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