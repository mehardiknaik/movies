import { Container, TextField } from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import { Animations } from "../Animations/Animations";
import CustomTabs from "../Components/CustomTabs";
import MovieTable from "../Components/MovieTable";
import { TypeContext } from "../Context/Typestate";
import searchbg from "../Images/searchbg.png";

const ImageContainer = styled.div`
  position: fixed;
  bottom: 0;
  z-index: -1;
  & img {
    max-height: 50vh;
  }
`;
const SearchInputContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  position: sticky;
  top: 54px;
  z-index: 100;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.24);
`;

const Search = () => {
  const [searchtext, setsearchtext] = useState("");
  const [numOfPages, setNumOfPages] = useState();
  const [movies, setmovies] = useState([]);
  const [page, setPage] = useState(1);
  const { type } = useContext(TypeContext);

  const getMovies = async () => {
    const url = "https://api.themoviedb.org/3/";
    if (searchtext.length < 2) {
      if (movies) setmovies([]);
      return;
    }
    const { data } = await axios.get(`${url}search/${type}`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        language: "en-US",
        query: searchtext,
        page: page,
      },
    });
    if (page === 1) {
      setmovies(data.results);
      setNumOfPages(data.total_pages);
    } else setmovies((prev) => [...prev, ...data.results]);
  };

  const handletextchange = (e) => {
    setsearchtext(e);
    setPage(1);
  };

  //````````Debouncing`````````````
  const DebouncFun = function (fn, d) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, d);
    };
  };

  const CallFunc = DebouncFun(handletextchange, 300);

  useEffect(() => {
    getMovies();
  }, [searchtext, page, type]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Search</title>
      </Helmet>
      <ImageContainer>
        <img width={"50%"} src={searchbg} alt="searchbg" />
      </ImageContainer>
      <Container
        component={motion.div}
        variants={Animations}
        initial="initial"
        animate="animate"
        exit="exit"
        sx={{ marginBottom: "15px" }}
      >
        <CustomTabs setPage={setPage} />
        <SearchInputContainer>
          <TextField
            fullWidth
            label="Search Movies"
            id="standard-search"
            type="search"
            // variant="standard"
            onChange={(e) => CallFunc(e.target.value)}
          />
        </SearchInputContainer>
        {movies.length > 0 && (
          <MovieTable
            movies={movies}
            setPage={setPage}
            numOfPages={numOfPages}
            page={page}
          />
        )}
      </Container>
    </>
  );
};

export default Search;
