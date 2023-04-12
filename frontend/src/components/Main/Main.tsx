import React from 'react';
import Header from '../Header/Header';


type HeaderProps = {
    title: string;
    handleClick: () => void;
    buttonText: string;
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const Main = ({ children, title, handleClick, buttonText, searchValue, setSearchValue } : { children: React.ReactNode } & HeaderProps) => {
  return (
    <>
      <Header 
        title={title} 
        handleClick={handleClick} 
        buttonText={buttonText} 
        searchValue={searchValue} 
        setSearchValue={setSearchValue} />
      <main>{children}</main>
    </>
  );
};

export default Main;