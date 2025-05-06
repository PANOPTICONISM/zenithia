import * as amplitude from "@amplitude/analytics-browser";
import React from "react";
import { useLocation } from "react-router";
import { useUserData } from "../contexts/UserProvider";

export const usePageViewTracking = () => {
  const [user] = useUserData();

  const location = useLocation();
  const authOrNormalPage = user ? "Auth" : "Dashboard";
  const pageName = location.pathname.split("/").pop() || authOrNormalPage;

  React.useEffect(() => {
    amplitude.setUserId(user?.id);
    amplitude.track("pageView", {
      pageName: pageName.charAt(0).toUpperCase() + pageName.slice(1)
    });
  }, [location, pageName, user?.id]);

  return null;
};
