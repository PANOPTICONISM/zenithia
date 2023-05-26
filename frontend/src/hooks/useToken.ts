import React from 'react';

export const useToken = () => {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    if (!tokenString) {
      return;
    }
    const userToken = JSON.parse(tokenString);
    return userToken;
  };
  
  const [token, setToken] = React.useState<string | undefined>(getToken());
    
  React.useEffect(() => {
    if (token) {
      sessionStorage.setItem('token', JSON.stringify(token));
    }
  }, [token]);
  
  return {
    token,
    setToken
  };
};