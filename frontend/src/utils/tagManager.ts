import React from "react";
import TagManager from "react-gtm-module";
import { useLocation } from "react-router";
import { useUserData } from "../contexts/UserProvider";

export const usePageViewTracking = () => {
  const location = useLocation();
  const [user] = useUserData();

  React.useEffect(() => {
    const tagManagerArgs = {
      dataLayer: {
        event: "pageview",
        page: location.pathname,
        user: user?.id
      }
    };
    TagManager.dataLayer(tagManagerArgs);
  }, [location, user?.id]);

  return null;
};
