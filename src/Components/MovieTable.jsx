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
import styled from "styled-components";

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

const SingleItem = styled(Link)`
  & img {
    transition: all 0.3s ease-in-out;
    transform: scale(1);
  }
  &:hover {
    & img {
      transform: scale(1.1);
    }
  }
`;

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
            <MovieItem {...item} type={type} key={item.id} />
          ))}
        </Box>
      </ThemeProvider>
    </InfiniteScroll>
  );
};

const MovieItem = ({
  poster_path,
  name,
  title,
  release_date,
  first_air_date,
  id,
  type,
}) => {
  return (
    <SingleItem to={`/${type}=${id}`}>
      <ImageListItem component={Card}>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w300/${poster_path}`
              : Noposter
          }
          alt={title || name}
          loading="lazy"
        />
        <ImageListItemBar
          sx={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, " +
              "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
          }}
          position="bottom"
          title={title || name}
          subtitle={dayjs(release_date || first_air_date).format("D-MMM-YY")}
        />
      </ImageListItem>
    </SingleItem>
  );
};
export default MovieTable;
