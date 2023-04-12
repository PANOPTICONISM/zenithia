import React from 'react';

export type SearchBarContextValues = {
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  };
  
const defaultValues = {
  searchValue: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSearchValue: () => {},
};
  
export const SearchBarContext = React.createContext<SearchBarContextValues>(defaultValues);
  
export const SearchBarProvider = (({ children }: { children: React.ReactNode; }) => {
  const [searchValue, setSearchValue] = React.useState<string>('');
  
  const value = React.useMemo(() => (
    {
      searchValue,
      setSearchValue,
    }
  ), [searchValue]);
  
  return (
    <SearchBarContext.Provider value={value}>
      {children}
    </SearchBarContext.Provider>
  );
});
  
export const useSearchBar = () => {
  const { searchValue, setSearchValue } = React.useContext(SearchBarContext);
  return React.useMemo(() => [searchValue, setSearchValue] as const, [searchValue, setSearchValue]);
};