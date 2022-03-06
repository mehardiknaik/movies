import React, { useEffect } from "react";
import styled from "styled-components";
import Noposter from "../Images/Noposter.jpg";
import calendar from "../Images/calendar.svg";
import star from "../Images/star.svg";
import clock from "../Images/clock.svg";
import dayjs from "dayjs";
import breakpoint from "styled-components-breakpoint";
import AliceCarousel from "react-alice-carousel";
import noperson from "../Images/noperson.png";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import styles from "../styles/MovieDatils.module.css";
import { motion } from "framer-motion";
import ColorThief from "colorthief";
import { GardientCount } from "../Config/Config";

const TopContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  & .imageContainer {
    height: auto;
    width: 40%;
    max-width: 200px;
    min-width: 144px;
    & img {
      border-radius: 4px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
  }
  & .infoContainer {
    flex: 1;
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
const lineAnimation = {
  hidden: {
    width: 0,
  },
  visible: {
    width: "100%",
    transition: {
      duration: 1.3,
    },
  },
};
const titleAnimationContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
const titleAnimation = {
  hidden: {
    y: -200,
  },
  visible: {
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const CurosulesContainer = styled.div`
  padding: 10px;
  text-align: center;
  & img {
    border-radius: 4px;
    margin-bottom: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;

const MovieDatils = ({
  poster_path,
  name,
  title,
  release_date,
  runtime,
  genres,
  spoken_languages,
  overview,
  credits,
  status,
  production_companies,
  homepage,
  trailer,
  setRgba,
  type,
  networks,
  seasons,
  NetworkClick,
  tagline,
  episode_run_time,
  number_of_episodes,
  imdb,
  watchNow,
}) => {
  const image = poster_path
    ? `https://image.tmdb.org/t/p/w300/${poster_path}`
    : Noposter;
  const { cast, crew } = credits;

  const GetBgColour = (e) => {
    var colorThief = new ColorThief();
    const gradientData = colorThief.getPalette(e.target, GardientCount); //Add number to get more colors default 10
    Bgcolour(gradientData);
  };
  const Bgcolour = (gradientData) => {
    const rgb = gradientData.map((el, i) => `rgb(${el},${100 - i * 7}%)`);
    setRgba(rgb.join());
  };

  return (
    <>
      <TopContainer>
        <div className="imageContainer">
          <img
            src={image}
            width={"100%"}
            height={"100%"}
            alt={title || name}
            onLoad={GetBgColour}
            crossOrigin="Anonymous"
          />
        </div>
        <div className="infoContainer">
          <Card variant="outlined" sx={{ background: "#ffffff38" }}>
            <CardContent>
              <Typography variant="h5" component="div">
                <motion.div
                  variants={titleAnimationContainer}
                  initial="hidden"
                  animate="visible"
                  style={{ display: "flex", flexWrap: "wrap" }}
                >
                  <Title title={title ? [...title] : [...name]} />
                </motion.div>
              </Typography>
              {tagline && (
                <Typography color="text.secondary">{tagline}</Typography>
              )}
              <SubTitleContainer>
                {type && (
                  <div className={styles.Subtitle}>
                    <Typography sx={{ mr: 1.5 }} color="text.secondary">
                      {type}
                    </Typography>
                  </div>
                )}
                <div className={styles.Subtitle}>
                  <img src={calendar} width={14} height={14} alt="" />
                  <Typography sx={{ mr: 1.5 }} color="text.secondary">
                    {dayjs(release_date).format("D-MMM-YYYY")}
                  </Typography>
                </div>
                {imdb > 0 && (
                  <div className={styles.Subtitle}>
                    <img src={star} width={14} height={14} alt="" />
                    <Typography sx={{ mr: 1.5 }} color="text.secondary">
                      <Typography
                        sx={{ fontSize: "1.25rem", fontWeight: "600" }}
                        component="span"
                        color="text.secondary"
                      >
                        {imdb}
                      </Typography>
                      /10
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
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                mt={{ xs: 1, sm: 2, md: 4 }}
              >
                {trailer && (
                  <Button
                    variant="outlined"
                    color="error"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  >
                    Trailer
                  </Button>
                )}
                {/* {homepage && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    href={homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Watch Now
                  </Button>
                )} */}
              </Stack>
            </CardContent>
          </Card>
        </div>
      </TopContainer>
      <motion.div variants={lineAnimation} initial="hidden" animate="visible">
        <Divider variant="middle" sx={{ margin: 1 }} />
      </motion.div>

      <Grid container spacing={2}>
        {watchNow.length > 0 && (
          <Grid item sm={6} xs={12}>
            <Card variant="outlined" sx={{ background: "#ffffff38" }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Watch Now
                </Typography>
                <div className={styles.WatchNowButton}>
                  {watchNow.map((el, i) => (
                    <Button
                      key={i}
                      sx={{
                        width: "fit-content",
                      }}
                      variant="outlined"
                      color="success"
                      href={el.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {el.provider}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Grid>
        )}
        {
          <Grid item sm={6} xs={12}>
            <Card variant="outlined" sx={{ background: "#ffffff38" }}>
              <CardContent>
                {status && (
                  <>
                    <Typography variant="h5" component="div">
                      Status
                    </Typography>
                    <Typography color="text.secondary">{status}</Typography>
                  </>
                )}
                {genres?.length > 0 && (
                  <>
                    <Typography variant="h5" component="div">
                      Genres
                    </Typography>
                    <div className={styles.inRow}>
                      {genres.map((genre, index) => (
                        <Typography color="text.secondary" key={genre.id}>
                          {genre.name}
                          {genres.length - 1 !== index && ","}
                        </Typography>
                      ))}
                    </div>
                  </>
                )}
                {spoken_languages?.length > 0 && (
                  <>
                    <Typography variant="h5" component="div">
                      Language
                    </Typography>
                    <div className={styles.inRow}>
                      {spoken_languages.map((language, index) => (
                        <Typography color="text.secondary" key={index}>
                          {language.english_name}
                          {spoken_languages.length - 1 !== index && ","}
                        </Typography>
                      ))}
                    </div>
                  </>
                )}
                {production_companies?.length > 0 && (
                  <>
                    <Typography variant="h5" component="div">
                      Production Companies
                    </Typography>
                    <div className={styles.inRow}>
                      {production_companies.map((companies, index) => (
                        <Typography color="text.secondary" key={index}>
                          {companies.name}
                          {production_companies.length - 1 !== index && ","}
                        </Typography>
                      ))}
                    </div>
                  </>
                )}
                {networks?.length > 0 && (
                  <>
                    <Typography variant="h5" component="div">
                      Watch On
                    </Typography>
                    <div className={styles.inRow}>
                      {networks.map((network, index) => (
                        <Stack
                          direction="row"
                          spacing={1}
                          key={index}
                          onClick={() => NetworkClick(network.id)}
                          sx={{ cursor: "pointer" }}
                        >
                          {network.logo_path && (
                            <img
                              src={`https://image.tmdb.org/t/p/w92${network.logo_path}`}
                              alt={network.name}
                              style={{
                                marginRight: "5px",
                              }}
                              height={26}
                            />
                          )}
                          <Typography color="text.secondary">
                            {network.name}
                            {networks.length - 1 !== index && ","}
                          </Typography>
                        </Stack>
                      ))}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        }
        {overview && (
          <Grid item sm={6} xs={12}>
            <Card variant="outlined" sx={{ background: "#ffffff38" }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Overview
                </Typography>
                <Typography color="text.secondary" paragraph>
                  {overview}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
        {seasons?.length > 0 && (
          <Grid item sm={6} xs={12}>
            <Card variant="outlined" sx={{ background: "#ffffff38" }}>
              <CardContent>
                {number_of_episodes && (
                  <>
                    <Typography variant="h5" component="div">
                      Total Episodes
                    </Typography>
                    <Typography color="text.secondary" paragraph>
                      {number_of_episodes} Episodes
                    </Typography>
                  </>
                )}
                {episode_run_time.length > 0 && (
                  <>
                    <Typography variant="h5" component="div">
                      Runtime
                    </Typography>
                    <Typography color="text.secondary" paragraph>
                      {episode_run_time[0]} Minutes per episode
                    </Typography>
                  </>
                )}
                <Typography variant="h5" component="div">
                  Seasons {seasons[seasons.length - 1].season_number}
                </Typography>
                <SeasonCurosules data={seasons} />
              </CardContent>
            </Card>
          </Grid>
        )}
        {cast?.length > 0 && (
          <Grid item sm={6} xs={12}>
            <Card variant="outlined" sx={{ background: "#ffffff38" }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Cast
                </Typography>
                <Curosules data={cast} />
              </CardContent>
            </Card>
          </Grid>
        )}
        {crew.length > 0 && (
          <Grid item sm={6} xs={12}>
            <Card variant="outlined" sx={{ background: "#ffffff38" }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Crew
                </Typography>
                <Curosules data={crew} />
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </>
  );
};
const responsive = {
  0: {
    items: 1,
  },
  269: {
    items: 2,
  },
  375: {
    items: 3,
  },
  900: {
    items: 4,
  },
};

const Curosules = ({ data }) => {
  const handleDragStart = (e) => e.preventDefault();
  const items = data.map((c) => (
    <a
      href={`https://www.google.com/search?q=${c?.name.replace(/\s+/g, "+")}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <CurosulesContainer>
        <img
          src={
            c.profile_path
              ? `https://image.tmdb.org/t/p/w92${c.profile_path}`
              : noperson
          }
          alt={c?.name}
          onDragStart={handleDragStart}
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
      </CurosulesContainer>
    </a>
  ));

  return (
    <AliceCarousel
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay={items?.length > 2 ? true : false}
      autoPlayInterval={1500}
    />
  );
};

const SeasonCurosules = ({ data }) => {
  const handleDragStart = (e) => e.preventDefault();
  const items = data.map((c) => (
    <CurosulesContainer>
      <img
        src={
          c.poster_path
            ? `https://image.tmdb.org/t/p/w92${c.poster_path}`
            : noperson
        }
        alt={c?.name}
        onDragStart={handleDragStart}
      />
      <Typography variant="h6" component="div">
        {c?.name}
      </Typography>
      <div>
        {c.air_date && (
          <Typography color="text.secondary">
            {dayjs(c?.air_date).format("D-MMM-YYYY")}
          </Typography>
        )}
        {c.episode_count && (
          <Typography color="text.secondary">
            Episode {c?.episode_count}
          </Typography>
        )}
      </div>
    </CurosulesContainer>
  ));
  return (
    <AliceCarousel
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay={items?.length > 2 ? true : false}
      autoPlayInterval={1500}
    />
  );
};

const Title = ({ title }) => {
  return title.map((t, index) => (
    <motion.div variants={titleAnimation} key={index}>
      {t === " " ? "\u00A0" : t}
    </motion.div>
  ));
};

export default MovieDatils;
