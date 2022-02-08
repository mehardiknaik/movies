import { Container } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Components/Header/Header";
import MovieDatils from "../Components/MovieDatils";

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const url = "https://api.themoviedb.org/3/";

  const getMovie = async () => {
    await axios
      .get(`${url}movie/${id}`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          language: "en-US",
          append_to_response: "videos,credits",
        },
      })
      .then((response) => {
        console.log("data", response.data);
        setMovie(response.data);
      })
      .catch((err) => console.log("Error===", err));
  };
  useEffect(() => {
    getMovie();
  }, []);

  return (
    <>
      {movie && (
        <>
          <Header title={movie?.title} isMovie />
          <Container>
            <MovieDatils
              poster_path={movie?.poster_path}
              title={movie?.title}
              release_date={movie?.release_date}
              vote_average={movie?.vote_average}
              runtime={movie?.runtime}
            />
          </Container>
        </>
      )}
    </>
  );
};

export default Movie;
