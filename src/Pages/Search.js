import { Container, TextField } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import CustomPagination from "../Components/CustomPagination";
import CustomTabs from "../Components/CustomTabs";
import Header from "../Components/Header/Header";
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
`;

const Search = () => {
  const [searchtext, setsearchtext] = useState("");
  const [numOfPages, setNumOfPages] = useState();
  const [movies, setmovies] = useState([]);
  const [page, setPage] = useState(1);
  const { type } = useContext(TypeContext);
  const getMovies = async () => {
    const url = "https://api.themoviedb.org/3/";
    if (searchtext.length < 2) return;
    const { data } = await axios.get(`${url}search/${type}`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        language: "en-US",
        query: searchtext,
        page: page,
      },
    });
    setmovies(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    getMovies();
  }, [searchtext, page, type]);

  return (
    <>
      <Container sx={{ marginBottom: "15px" }}>
        <CustomTabs page={page} setPage={setPage} />
        <ImageContainer>
          <img width={"50%"} src={searchbg} alt="searchbg" />
        </ImageContainer>
        <SearchInputContainer>
          <TextField
            fullWidth
            label="Search Movies"
            id="standard-search"
            type="search"
            // variant="standard"
            id="fullWidth"
            onChange={(e) => setsearchtext(e.target.value)}
          />
        </SearchInputContainer>
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

export default Search;
