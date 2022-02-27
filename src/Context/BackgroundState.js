import React, { createContext, useEffect, useState } from "react";

export const BackgroundContext = createContext();

const BackgroundState = ({ children }) => {
  const local = localStorage.getItem("background");
  const [background, setBackground] = useState(local?JSON.parse(local):true);

  useEffect(() => {
    localStorage.setItem("background", background);
  }, [background]);

  return (
    <BackgroundContext.Provider value={{ background, setBackground }}>
      {children}
    </BackgroundContext.Provider>
  );
};

export default BackgroundState;
