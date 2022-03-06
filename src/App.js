import "./App.css";
import Home from "./Pages/Home";
import Footer from "./Components/Footer/Footer";
import { Routes, Route, useLocation } from "react-router-dom";
import Movie from "./Pages/Movie";
import Search from "./Pages/Search";
import Typestate from "./Context/Typestate";
import Header from "./Components/Header/Header";
import { HelmetProvider } from "react-helmet-async";
import BackgroundState from "./Context/BackgroundState";
import { AnimatePresence } from "framer-motion";
function App() {
  const location = useLocation();
  return (
    <HelmetProvider>
      <Typestate>
        <BackgroundState>
          <Header />
          <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/:id" element={<Movie />} />
            </Routes>
          </AnimatePresence>
          <Footer />
        </BackgroundState>
      </Typestate>
    </HelmetProvider>
  );
}

export default App;
