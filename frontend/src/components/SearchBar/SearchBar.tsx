import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import { darkBlue } from "../../App";
import { useSearchBar } from "../../contexts/SearchBarProvider";

export const SearchBar = () => {
  const [searchValue, setSearchValue] = useSearchBar();

  return (
    <TextField
      size="small"
      id="search"
      type="search"
      label="Search"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        )
      }}
      sx={{ color: darkBlue }}
      focused
    />
  );
};
