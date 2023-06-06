import React from 'react';

export type UserProps = {
  id: string,
  username: string,
}

export const useUser = () => {
  const getUser = () => {
    const userDetails = sessionStorage.getItem('user');
    if (!userDetails) {
      return;
    }
    const userParsed = JSON.parse(userDetails);
    return userParsed;
  };
  
  const [user, setUser] = React.useState<UserProps | undefined>(getUser());
    
  React.useEffect(() => {
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);
  
  return {
    user,
    setUser
  };
};