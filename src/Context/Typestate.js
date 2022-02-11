import React, { createContext, useState } from "react";

export const TypeContext = createContext();

const Typestate = ({ children }) => {
  const [type, setType] = useState("movie");
  
  return (
    <TypeContext.Provider value={{ type, setType }}>
      {children}
    </TypeContext.Provider>
  );
};

export default Typestate;
