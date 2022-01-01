import React, { useState, useEffect, useContext } from "react";
import { useInView } from "react-intersection-observer";
import GlobalEventContext from "../GlobalEventContext";

export default ({ children }) => {
  const { shouldExpandLazyLoadedContent } = useContext(GlobalEventContext);
  const [shouldForceRender, setShouldForceRender] = useState(false);

  // If the global context says we need to force render, do it.
  useEffect(() => {
    shouldExpandLazyLoadedContent && setShouldForceRender(true);
  }, [shouldExpandLazyLoadedContent]);

  if (shouldForceRender) {
    return <div>{children}</div>;
  }

  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: true,
    rootMargin: "200px",
  });

  return <div ref={ref}>{inView && children}</div>;
};
