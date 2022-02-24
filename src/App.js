import "./App.css";
import Home from "./Pages/Home";
import Footer from "./Components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Movie from "./Pages/Movie";
import Search from "./Pages/Search";
import Typestate from "./Context/Typestate";
import Header from "./Components/Header/Header";
import { HelmetProvider } from "react-helmet-async";
function App() {
  return (
    <HelmetProvider>
      <Typestate>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/:id" element={<Movie />} />
        </Routes>
        <Footer />
      </Typestate>
    </HelmetProvider>
  );
}

export default App;
