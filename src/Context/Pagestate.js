import React, { createContext, useState } from "react";

export const PageContext = createContext();

const Pagestate = ({ children }) => {
  const [page, setPage] = useState(1);
  return (
    <PageContext.Provider value={{ page, setPage }}>
      {children}
    </PageContext.Provider>
  );
};

export default Pagestate;
