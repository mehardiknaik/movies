import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Container } from "@mui/material";
import Curousel from "../Components/Curousel";
import MovieTable from "../Components/MovieTable";
import CustomTabs from "../Components/CustomTabs";
import { TypeContext } from "../Context/Typestate";
import Genres from "../Components/Genres";
const Home = () => {
  const url = "https://api.themoviedb.org/3/";
  const [movies, setmovies] = useState([]);
  const [upcomingmovies, setupcomingmovies] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [selectedGenres, setselectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const { type } = useContext(TypeContext);

  const getMovies = async () => {
    const { data } = await axios.get(`${url}discover/${type}`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        language: "hi-IN|mr-IN",
        sort_by: "release_date.desc",
        page: page,
        with_original_language: "hi|mr",
        "release_date.lte": "2022-12-31",
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
        language: "hi-IN|mr-IN",
        with_original_language: "hi|mr",
      },
    });
    setupcomingmovies(data.results);
  };

  useEffect(() => {
    getUpcomignMovies();
  }, [type]);

  useEffect(() => {
    getMovies();
  }, [page, selectedGenres,type]);

  return (
    <>
      <Container sx={{ marginBottom: "15px" }}>
        <CustomTabs setPage={setPage} setselectedGenres={setselectedGenres}/>
        {upcomingmovies.length > 0 && (
          <div>
            <Curousel upcomingmovies={upcomingmovies} />
          </div>
        )}
        <Genres selectedGenres={selectedGenres} setselectedGenres={setselectedGenres} setPage={setPage}/>
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
