import React from "react";
import styled from "styled-components";
import Noposter from "../Images/Noposter.jpg";
import calendar from "../Images/calendar.svg";
import star from "../Images/star.svg";
import clock from "../Images/clock.svg";
import dayjs from "dayjs";
import breakpoint from "styled-components-breakpoint";
import AliceCarousel from "react-alice-carousel";
import noperson from "../Images/noperson.png";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import styles from "../styles/Movied.module.css";
import { motion } from "framer-motion";

const TopContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  & .imageContainer {
    height: auto;
    width: 40%;
    max-width: 200px;
    & img {
      border-radius: 10px;
    }
  }
`;

const SubTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px 19px;
  ${breakpoint("sm")`
  flex-direction: row;
`}
`;
const animation = {
  hidden: {
    scale: 0,
    opetacity: 0,
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
const MovieDatils = ({
  poster_path,
  title,
  release_date,
  vote_average,
  runtime,
  genres,
  spoken_languages,
  overview,
  credits,
}) => {
  const image = poster_path
    ? `https://image.tmdb.org/t/p/w300/${poster_path}`
    : Noposter;
  const { cast, crew } = credits;

  return (
    <>
      <TopContainer>
        <div data-aos="fade-left" className="imageContainer">
          <img src={image} width={"100%"} height={"100%"} alt="" />
        </div>
        <div data-aos="fade-right">
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <SubTitleContainer>
            <div className={styles.Subtitle}>
              <img src={calendar} width={14} height={14} alt="" />
              <Typography sx={{ mr: 1.5 }} color="text.secondary">
                {dayjs(release_date).format("D-MMM-YYYY")}
              </Typography>
            </div>
            {vote_average > 0 && (
              <div className={styles.Subtitle}>
                <img src={star} width={14} height={14} alt="" />
                <Typography sx={{ mr: 1.5 }} color="text.secondary">
                  {vote_average}
                </Typography>
              </div>
            )}
            {runtime > 0 && (
              <div className={styles.Subtitle}>
                <img src={clock} width={14} height={14} alt="" />
                <Typography
                  sx={{ mr: 1.5 }}
                  color="text.secondary"
                >{`${parseInt((runtime / 60) % 24)} Hours ${
                  runtime % 60
                } Minutes`}</Typography>
              </div>
            )}
          </SubTitleContainer>
        </div>
      </TopContainer>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <motion.div variants={animation} initial="hidden" animate="visible">
            <Card>
              {genres.length > 0 && (
                <CardContent>
                  <Typography variant="h5" component="div">
                    Genres
                  </Typography>
                  <div className={styles.inRow}>
                    {genres.map((genre) => (
                      <Typography
                        sx={{ mr: 1.5 }}
                        color="text.secondary"
                        key={genre.id}
                      >
                        {genre.name}
                      </Typography>
                    ))}
                  </div>
                </CardContent>
              )}
              {spoken_languages.length > 0 && (
                <CardContent>
                  <Typography variant="h5" component="div">
                    Language
                  </Typography>
                  <div className={styles.inRow}>
                    {spoken_languages.map((language, index) => (
                      <Typography
                        sx={{ mr: 1.5 }}
                        color="text.secondary"
                        key={index}
                      >
                        {language.english_name}
                      </Typography>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          </motion.div>
        </Grid>
        {overview && (
          <Grid item md={6} xs={12}>
            <motion.div variants={animation} initial="hidden" animate="visible">
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="div">
                    Overview
                  </Typography>
                  <Typography color="text.secondary">{overview}</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        )}
        {cast.length > 0 && (
          <Grid item md={6} xs={12}>
            <Card variant="outlined">
              <CardContent>
                <motion.div
                  variants={animation}
                  initial="hidden"
                  animate="visible"
                >
                  <Typography variant="h5" component="div">
                    Cast
                  </Typography>
                </motion.div>
                <Curosules data={cast} />
              </CardContent>
            </Card>
          </Grid>
        )}
        {crew.length > 0 && (
          <Grid item md={6} xs={12}>
            <Card variant="outlined">
              <CardContent>
                <motion.div
                  variants={animation}
                  initial="hidden"
                  animate="visible"
                >
                  <Typography variant="h5" component="div">
                    Crew
                  </Typography>
                </motion.div>
                <Curosules data={crew} />
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </>
  );
};

const Curosules = ({ data }) => {
  const handleDragStart = (e) => e.preventDefault();
  const items = data.map((c) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        objectfit: "contain",
        padding: "10px",
        textAlign: "center",
      }}
    >
      <img
        src={
          c.profile_path
            ? `https://image.tmdb.org/t/p/w92/${c.profile_path}`
            : noperson
        }
        alt="{c?.name}"
        onDragStart={handleDragStart}
        style={{
          borderRadius: "10px",
          marginBottom: "5px",
          boxShadow: "0px 0px 5px black",
        }}
      />
      <Typography variant="h6" component="div">
        {c?.name}
      </Typography>
      <div>
        {c.job && <Typography color="text.secondary">{c?.job}</Typography>}
        {c.character && (
          <Typography color="text.secondary">{c?.character}</Typography>
        )}
      </div>
    </div>
  ));
  const responsive = {
    0: {
      items: 3,
    },
    720: {
      items: 4,
    },
  };

  return (
    <AliceCarousel
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay
      autoPlayInterval={1500}
    />
  );
};

export default MovieDatils;
