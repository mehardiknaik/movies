import React, { useState } from "react";
import styled from "styled-components";
import { prominent } from "color.js";
import Noposter from "../Images/Noposter.jpg";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import breakpoint from "styled-components-breakpoint";
const WidgetContainer = styled.div`
  background: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0px 0px 5px black;
  justify-content: center;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`;
const BottomContainer = styled.div`
  height: 50%;
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 15px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 10%,
    rgb(20 20 20) 90%
  );
  & .title {
    color: white;
    margin-top: 10px;
    font-size: 14px;
  }
  & .subtitle {
    color: #b6b6b6;
    font-size: 12px;
    display: flex;
    margin-bottom: 9%;
    margin-left: 10px;
    margin-right: 10px;
    justify-content: space-between;
  }
`;

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  ${breakpoint("sm")`
  grid-template-columns: 1fr 1fr 1fr;
`}
  ${breakpoint("lg")`
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`}
`;

const MovieTable = ({ movies }) => {
  return (
    <MainContainer>
      {movies.map((movie) => (
        <MovieWidget
          key={movie.id}
          title={movie.title || movie.name}
          poster_path={movie.poster_path}
          original_language={
            movie.original_language === "mr" ? "Marathi" : "Hindi"
          }
          release_date={movie.release_date || movie.first_air_date}
          id={movie.id}
        />
      ))}
    </MainContainer>
  );
};

const MovieWidget = ({
  title,
  poster_path,
  original_language,
  release_date,
  id,
}) => {
  const [Colour, setColour] = useState();
  const image = poster_path
    ? `https://image.tmdb.org/t/p/w300/${poster_path}`
    : Noposter;
  // const Getcolor = async () => {
  //   const color = await prominent(image, {
  //     amount: 1,
  //     format: "hex",
  //   });
  //   setColour(color);
  // };
  // useEffect(() => {
  //   Getcolor();
  // }, []);
  return (
    <WidgetContainer data-aos="fade-up">
      <Link to={`/${id}`}>
        <img src={image} width={"100%"} height={"100%"} alt="" />
        <BottomContainer Colour={Colour}>
          <div className="title">{title}</div>
          <div className="subtitle">
            <div>{original_language}</div>
            <div>{dayjs(release_date).format("D-MMM-YY")}</div>
          </div>
        </BottomContainer>
      </Link>
    </WidgetContainer>
  );
};
export default MovieTable;
