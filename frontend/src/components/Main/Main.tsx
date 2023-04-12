import React from 'react';
import Header from '../Header/Header';


type HeaderProps = {
    title: string;
    handleClick: () => void;
    buttonText: string;
}

const Main = ({ children, title, handleClick, buttonText } : { children: React.ReactNode } & HeaderProps) => {
  return (
    <>
      <Header title={title} handleClick={handleClick} buttonText={buttonText} />
      <main>{children}</main>
    </>
  );
};

export default Main;