import { Chip } from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";
import { TypeContext } from "../Context/Typestate";

const GenresContainer = styled(motion.div)`
  display: flex;
  overflow-x: auto;
  margin-bottom: 10px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ${breakpoint("md")`
  flex-wrap: wrap;
`}
  &::-webkit-scrollbar {
    width: 0;
    display: none;
  }
`;
const gendresContainerAnimation = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const gendreAnimation = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
    },
  },
};

const Genres = ({ selectedGenres, setselectedGenres, setPage }) => {
  const [genres, setGenres] = useState([]);
  const { type } = useContext(TypeContext);
  const url = "https://api.themoviedb.org/3/";
  const fetchGenres = async () => {
    const { data } = await axios.get(`${url}genre/${type}/list`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        language: "en-US",
      },
    });
    setGenres(data.genres);
  };
  const handleAdd = (genre) => {
    setselectedGenres([...selectedGenres, genre]);
    setPage(1);
  };
  const handleRemove = (genre) => {
    setselectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setPage(1);
  };
  useEffect(() => {
    fetchGenres();
  }, [type]);
  return (
    <>
      {genres.length > 0 && (
        <GenresContainer
          variants={gendresContainerAnimation}
          initial="hidden"
          animate="visible"
        >
          {selectedGenres.map((genre) => (
            <motion.div variants={gendreAnimation} key={genre.id}>
              <Chip
                style={{ margin: 2 }}
                label={genre.name}
                color="secondary"
                clickable
                onDelete={() => handleRemove(genre)}
              />
            </motion.div>
          ))}
          {genres.map((genre) => {
            if (!selectedGenres.some((a) => a.id === genre.id)) {
              return (
                <motion.div variants={gendreAnimation} key={genre.id}>
                  <Chip
                    style={{ margin: 2 }}
                    label={genre.name}
                    clickable
                    variant="outlined"
                    onClick={() => handleAdd(genre)}
                  />
                </motion.div>
              );
            }
          })}
        </GenresContainer>
      )}
    </>
  );
};

export default Genres;
