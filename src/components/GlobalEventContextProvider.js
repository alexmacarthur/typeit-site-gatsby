import React, { useEffect, useState } from "react";
import GlobalEventContext from "../GlobalEventContext";

export default ({ children }) => {
  const [shouldExpandLazyLoadedContent, setShouldExpandLazyLoadedContent] =
    useState(false);

  useEffect(() => {
    setShouldExpandLazyLoadedContent(window.ti_shouldExpandLazyLoadedContent);

    // Always reset this value for future page navigations.
    window.ti_shouldExpandLazyLoadedContent = false;

    // eslint-disable-next-line
  }, []);

  return (
    <GlobalEventContext.Provider
      value={{
        shouldExpandLazyLoadedContent,
      }}
    >
      {children}
    </GlobalEventContext.Provider>
  );
};
