import React, { createContext, useState, useEffect } from "react";

export const MobileContext = createContext();

export default ({ children }) => {
  //   const [width, setWidth] = useState(window.innerWidth);
  //   const [ifMobile, setIfMobile] = useState(false);

  //   useEffect(() => {
  //     if (window.innerWidth < 850) {
  //       setIfMobile(true);
  //     }
  //     console.log(ifMobile);
  //   }, [window.innerWidth]);

  const isClient = typeof window === "object";

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return <MobileContext.Provider value={{ windowSize }}>{children}</MobileContext.Provider>;
};
