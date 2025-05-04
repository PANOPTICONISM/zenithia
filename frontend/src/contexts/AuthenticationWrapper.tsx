import { Outlet } from "react-router";
import Authentication from "../pages/Authentication/Authentication";
import { SearchBarProvider } from "./SearchBarProvider";
import { SidebarProvider } from "./SidebarProvider";
import { useUserData } from "./UserProvider";

export const AuthenticationWrapper = () => {
  const [user] = useUserData();

  if (!user) {
    return <Authentication />;
  }

  return (
    <SidebarProvider>
      <SearchBarProvider>
        <Outlet />
      </SearchBarProvider>
    </SidebarProvider>
  );
};
