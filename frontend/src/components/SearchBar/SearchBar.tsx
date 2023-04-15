import { InputAdornment, TextField } from '@mui/material';
import { useSearchBar } from '../../contexts/SearchBarProvider';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

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
      InputProps={{
        startAdornment: <InputAdornment position="start"><SearchIcon fontSize='small' /></InputAdornment>,
      }}
      sx={{ color: '#1F2C4F' }}
      focused
    />
  );
};