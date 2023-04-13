import React from 'react';

export type SearchBarContextValues = {
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  };
  
export const SearchBarContext = React.createContext<SearchBarContextValues | null>(null);
  
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

const useNullableSearchBar = () => {
  const context = React.useContext(SearchBarContext);

  if (context === null) {
    throw new Error('SearchBarContext is missing');
  }
  return context;
};
  
export const useSearchBar = () => {
  const { searchValue, setSearchValue } = useNullableSearchBar();
  return React.useMemo(() => [searchValue, setSearchValue] as const, [searchValue, setSearchValue]);
};