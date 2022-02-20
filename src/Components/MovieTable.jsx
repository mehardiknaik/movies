import React, { useContext, useEffect, useState } from "react";
import Noposter from "../Images/Noposter.jpg";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Card,
  ImageListItem,
  ImageListItemBar,
  Box,
  imageListItemClasses,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TypeContext } from "../Context/Typestate";
import { motion } from "framer-motion";
import ColorThief from "colorthief";

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      bigMobile: 350,
      tablet: 650,
      desktop: 900,
    },
  },
});

const animation = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const MovieTable = ({ movies, numOfPages, setPage, page }) => {
  const [hasmore, sethasmore] = useState(true);
  const { type } = useContext(TypeContext);
  const changepage = () => {
    setPage((prevCount) => prevCount + 1);
  };
  useEffect(() => {
    if (numOfPages === page) {
      sethasmore(false);
    } else sethasmore(true);
  }, [numOfPages, page]);
  return (
    <InfiniteScroll
      dataLength={movies.length}
      next={changepage}
      hasMore={hasmore}
      loader={
        <p style={{ textAlign: "center" }}>
          <b>Loading...</b>
        </p>
      }
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              mobile: "repeat(1, 1fr)",
              bigMobile: "repeat(2, 1fr)",
              tablet: "repeat(3, 1fr)",
              desktop: "repeat(5, 1fr)",
              gap: "20px",
            },
            [`& .${imageListItemClasses.root}`]: {
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          {movies.map((item) => (
            <Link key={item.id} to={`/${type}=${item.id}`}>
              <MovieItem item={item} />
            </Link>
          ))}
        </Box>
      </ThemeProvider>
    </InfiniteScroll>
  );
};

const MovieItem = ({ item }) => {
  return (
    <motion.div variants={animation} initial="hidden" animate="visible">
      <ImageListItem component={Card}>
        <img
          src={
            item.poster_path
              ? `https://image.tmdb.org/t/p/w300/${item.poster_path}`
              : Noposter
          }
          alt={item.title || item.name}
          loading="lazy"
        />
        <ImageListItemBar
          sx={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, " +
              "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
          }}
          position="bottom"
          title={item.title || item.name}
          subtitle={dayjs(item.release_date || item.first_air_date).format(
            "D-MMM-YY"
          )}
        />
      </ImageListItem>
    </motion.div>
  );
};
export default MovieTable;
