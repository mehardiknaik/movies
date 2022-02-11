import "./App.css";
import Home from "./Pages/Home";
import Footer from "./Components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Movie from "./Pages/Movie";
import Search from "./Pages/Search";
import Pagestate from "./Context/Pagestate";
import Typestate from "./Context/Typestate";

function App() {
  return (
    <>
      <Pagestate>
        <Typestate>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/:id" element={<Movie />} />
          </Routes>
          <Footer />
        </Typestate>
      </Pagestate>
    </>
  );
}

export default App;
