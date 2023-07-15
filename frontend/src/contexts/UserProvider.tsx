import React from 'react';

type UserProps = {
  id: string,
  username: string,
  token: string,
}

type UserContextValues = {
    user: UserProps | undefined;
    setUser: React.Dispatch<React.SetStateAction<UserProps | undefined>>;
};
  
const UserContext = React.createContext<UserContextValues | null>(null);
  
export const UserProvider = (({ children }: { children: React.ReactNode; }) => {

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
      return sessionStorage.setItem('user', JSON.stringify(user));
    }

    return sessionStorage.removeItem('user');
  }, [user]);
  
  const value = React.useMemo(() => (
    {
      user,
      setUser,
    }
  ), [user]);
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
});

const useNullableUser = () => {
  const context = React.useContext(UserContext);

  if (context === null) {
    throw new Error('UserContext is missing');
  }
  return context;
};
  
export const useUserData = () => {
  const { user, setUser } = useNullableUser();
  return React.useMemo(() => [user, setUser] as const, [user, setUser]);
};