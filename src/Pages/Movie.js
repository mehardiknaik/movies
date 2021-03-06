import { Container } from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { Animations } from "../Animations/Animations";
import MovieDatils from "../Components/MovieDatils";
import MovieDetailBg from "../Components/MovieDetailBg";

const Movie = () => {
  const { id } = useParams();
  const type = id.split("=")[0];
  const code = id.split("=")[1];
  const [movie, setMovie] = useState();
  const [trailer, setTrailer] = useState();
  const [watchNow, setWatchNow] = useState([]);
  const [rgba, setRgba] = useState("rgb(255 255 255), rgb(216 216 216)");

  const url = "https://api.themoviedb.org/3/";
  const WatchNowUrl = "https://api.sumanjay.cf/";

  const getMovie = async () => {
    await axios
      .get(`${url}${type}/${code}`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          language: "en-US",
          append_to_response: "videos,credits",
        },
      })
      .then((response) => {
        console.log("data", response.data);
        Gettrailer(response.data.videos.results);
        setMovie(response.data);
        getWatchNow(response.data.title || response.data.name);
      })
      .catch((err) => console.log("Error===", err));
  };
  const Gettrailer = (data) => {
    if (data.length > 0)
      setTrailer(data.find((item) => item.type === "Trailer"));
  };
  const NetworkClick = async (id) => {
    await axios
      .get(`${url}network/${id}`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
        },
      })
      .then((response) => {
        console.log("data", response);
        const { data } = response;
        if (data.homepage) window.open(data.homepage, "_blank");
      })
      .catch((err) => console.log("Error===", err));
  };

  const getWatchNow = async (title) => {
    await axios.get(`${WatchNowUrl}/watch/${title}`).then((response) => {
      const { data } = response;
      const results = data.find((item) => item.title === title);
      if (results) {
        setMovie((prev) => ({ ...prev, ...results.score }));
        const { providers } = results;
        if(providers){
        var ArrayProviders = Object.entries(providers).map(
          (element) => new Object({ provider: element[0], url: element[1] })
        );
        setWatchNow(ArrayProviders);
        console.log("watch now", ArrayProviders);
        }
      }
    });
  };
  useEffect(() => {
    getMovie();
  }, []);

  return (
    <>
      {movie && (
        <div style={{ overflow: "hidden" }}>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{movie?.title || movie?.name}</title>
            <meta name="theme-color" content="#84FFC1" />
          </Helmet>
          <MovieDetailBg rgba={rgba} backdrop_path={movie?.backdrop_path} />
          <Container
            component={motion.div}
            variants={Animations}
            initial="initial"
            animate="animate"
            exit="exit"
            sx={{ marginBottom: "20px" }}
          >
            {/* <Player id="xaYJgKiIH0Q"/> */}
            <MovieDatils
              {...movie}
              setRgba={setRgba}
              NetworkClick={NetworkClick}
              trailer={trailer}
              watchNow={watchNow}
            />
          </Container>
        </div>
      )}
    </>
  );
};

export default Movie;
