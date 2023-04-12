import React from 'react';
import Header from '../Header/Header';

const Main = ({ children } : { children: React.ReactNode}) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Main;