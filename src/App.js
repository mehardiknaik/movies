import "./App.css";
import Home from "./Pages/Home";
import Footer from "./Components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Movie from "./Pages/Movie";
import { createContext, useState } from "react";

export const PageContext = createContext();

function App() {
  const [page, setPage] = useState(1);
  return (
    <>
    <PageContext.Provider value={{page,setPage}}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Movie/>} />
      </Routes>
      <Footer />
      </PageContext.Provider>
    </>
  );
}

export default App;
