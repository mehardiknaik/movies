import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Container, Stack } from "@mui/material";
import Curousel from "../Components/Curousel";
import MovieTable from "../Components/MovieTable";
import CustomTabs from "../Components/CustomTabs";
import { TypeContext } from "../Context/Typestate";
import Genres from "../Components/Genres";
import LanguageSelect from "../Components/LanguageSelect";
import { Language } from "../Config/Config";
import { motion } from "framer-motion";
import { Animations } from "../Animations/Animations";
const Home = () => {
  const url = "https://api.themoviedb.org/3/";
  const [movies, setmovies] = useState([]);
  const [upcomingmovies, setupcomingmovies] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [selectedGenres, setselectedGenres] = useState([]);
  const [SelectLanguage, setSelectLanguage] = useState(Language);
  const [page, setPage] = useState(1);
  const { type } = useContext(TypeContext);

  const getMovies = async () => {
    const { data } = await axios.get(`${url}discover/${type}`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        // language: "hi-IN|mr-IN",
        sort_by: "release_date.desc",
        page: page,
        "release_date.lte": "2022-12-31",
        with_original_language: SelectLanguage.map((item) => item.value).join(
          "|"
        ),
        with_genres: selectedGenres.map((genre) => genre.id).join(","),
      },
    });
    if (page === 1) {
      setmovies(data.results);
      setNumOfPages(data.total_pages);
    } else setmovies((prev) => [...prev, ...data.results]);
  };

  const getUpcomignMovies = async () => {
    const { data } = await axios.get(`${url}${type}/popular`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        // language: "hi-IN|mr-IN",
        with_original_language: SelectLanguage.map((item) => item.value).join(
          "|"
        ),
      },
    });
    setupcomingmovies(data.results);
  };

  useEffect(() => {
    getUpcomignMovies();
  }, [type, SelectLanguage]);

  useEffect(() => {
    getMovies();
  }, [page, selectedGenres, type, SelectLanguage]);

  return (
    <>
      <Container
        component={motion.div}
        variants={Animations}
        initial="initial"
        animate="animate"
        exit="exit"
        sx={{ marginBottom: "15px" }}
      >
        <Stack direction={{ xs: "row" }}>
          <CustomTabs setPage={setPage} setselectedGenres={setselectedGenres} />
          <LanguageSelect
            setPage={setPage}
            setSelectLanguage={setSelectLanguage}
            SelectLanguage={SelectLanguage}
          />
        </Stack>

        {upcomingmovies.length > 0 && (
          <div>
            <Curousel upcomingmovies={upcomingmovies} />
          </div>
        )}
        <Genres
          selectedGenres={selectedGenres}
          setselectedGenres={setselectedGenres}
          setPage={setPage}
        />
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

export default Home;
