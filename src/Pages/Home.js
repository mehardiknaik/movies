import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieWidget from "../Components/MovieWidget";
import styled from "styled-components";
import { Container } from "@mui/material";
import CustomPagination from "../Components/CustomPagination";
import breakpoint from "styled-components-breakpoint";
import Header from "../Components/Header/Header";

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  ${breakpoint("sm")`
  grid-template-columns: 1fr 1fr 1fr;
`}
  ${breakpoint("md")`
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`}
`;

const Home = () => {
  const [movies, setmovies] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [page, setPage] = useState(1);
  const getMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=hi-IN|mr-IN&sort_by=release_date.desc&page=${page}&with_original_language=hi|mr&release_date.lte=2022-12-31`
    );
    console.log("movies :", data.results);
    setmovies(data.results);
    setNumOfPages(data.total_pages);
  };
  useEffect(() => {
    getMovies();
  }, [page]);
  return (
    <>
    <Header/>
    <Container>
      {movies.length > 0 && (
        <MainContainer>
          {movies.map((movie) => (
            <MovieWidget
              key={movie.id}
              title={movie.title}
              poster_path={movie.poster_path}
              original_language={
                movie.original_language == "mr" ? "Marathi" : "Hindi"
              }
              release_date={movie.release_date}
            />
          ))}
        </MainContainer>
      )}
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </Container>
    </>
  );
};

export default Home;