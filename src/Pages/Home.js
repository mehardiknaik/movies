import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Container } from "@mui/material";
import CustomPagination from "../Components/CustomPagination";
import Header from "../Components/Header/Header";
import Curousel from "../Components/Curousel";
import MovieTable from "../Components/MovieTable";
import { PageContext } from "../Context/Pagestate";
import CustomTabs from "../Components/CustomTabs";
import { TypeContext } from "../Context/Typestate";

const Home = () => {
  const url = "https://api.themoviedb.org/3/";
  const [movies, setmovies] = useState([]);
  const [upcomingmovies, setupcomingmovies] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const { page, setPage } = useContext(PageContext);
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
      },
    });
    console.log("movies :", data.results);
    setmovies(data.results);
    setNumOfPages(data.total_pages);
  };

  const getUpcomignMovies = async () => {
    const { data } = await axios.get(`${url}${type}/popular`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        language: "hi-IN|mr-IN",
        with_original_language: "hi|mr",
      },
    });
    console.log("upcoming :", data.results);
    setupcomingmovies(data.results);
  };

  useEffect(() => {
    getMovies();
  }, [page, type]);

  useEffect(() => {
    getUpcomignMovies();
  }, [type]);
  return (
    <>
      <Container sx={{ marginBottom: "15px" }}>
        <CustomTabs page={page} setPage={setPage} />
        {upcomingmovies.length > 0 && (
          <div data-aos="fade" data-aos-delay="500">
            <Curousel upcomingmovies={upcomingmovies} />
          </div>
        )}
        {movies.length > 0 && <MovieTable movies={movies} />}
        {numOfPages > 1 && (
          <CustomPagination
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
