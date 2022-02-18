import { Container } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import Header from "../Components/Header/Header";
import MovieDatils from "../Components/MovieDatils";
import Player from "../Components/Player";
import { TypeContext } from "../Context/Typestate";

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const url = "https://api.themoviedb.org/3/";
  const { type } = useContext(TypeContext);
  const getMovie = async () => {
    await axios
      .get(`${url}${type}/${id}`, {
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
          <Helmet>
            <meta charSet="utf-8" />
            <title>{movie?.title || movie?.name}</title>
          </Helmet>
          <Container sx={{marginBottom:'20px'}}>
            {/* <Player id="xaYJgKiIH0Q"/> */}
            <MovieDatils
              poster_path={movie?.poster_path}
              title={movie?.title || movie?.name}
              release_date={movie?.release_date || movie?.first_air_date}
              vote_average={movie?.vote_average}
              runtime={movie?.runtime}
              genres={movie?.genres}
              spoken_languages={movie?.spoken_languages}
              overview={movie?.overview}
              credits={movie?.credits}
            />
          </Container>
        </>
      )}
    </>
  );
};

export default Movie;
