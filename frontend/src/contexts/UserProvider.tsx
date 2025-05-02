import { jwtDecode } from "jwt-decode";
import React from "react";

type UserProps = {
  id: string;
  username: string;
  token: string;
};

type JWTPayload = {
  exp: number;
};

type UserContextValues = {
  user: UserProps | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserProps | undefined>>;
};

const UserContext = React.createContext<UserContextValues | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const isValidToken = (token: string) => {
    try {
      const { exp } = jwtDecode<JWTPayload>(token);
      return exp && exp > Date.now() / 1000;
    } catch {
      return false;
    }
  };

  const getUser = () => {
    const userDetails = localStorage.getItem("user");
    if (!userDetails) {
      return;
    }

    const userParsed: UserProps = JSON.parse(userDetails);
    return isValidToken(userParsed.token) ? userParsed : undefined;
  };

  const [user, setUser] = React.useState<UserProps | undefined>(getUser());

  React.useEffect(() => {
    if (user && !isValidToken(user.token)) {
      setUser(undefined);
      return localStorage.removeItem("user");
    }

    if (user) {
      return localStorage.setItem("user", JSON.stringify(user));
    }
    return localStorage.removeItem("user");
  }, [user]);

  const value = React.useMemo(
    () => ({
      user,
      setUser
    }),
    [user]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useNullableUser = () => {
  const context = React.useContext(UserContext);

  if (context === null) {
    throw new Error("UserContext is missing");
  }
  return context;
};

export const useUserData = () => {
  const { user, setUser } = useNullableUser();
  return React.useMemo(() => [user, setUser] as const, [user, setUser]);
};
