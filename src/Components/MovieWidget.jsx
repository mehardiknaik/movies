import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { prominent } from "color.js";
import Noposter from "../Images/Noposter.jpg";
const WidgetContainer = styled.div`
  background: #f4f4f4;
  border-radius: 43px;
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
    ${(props) => props.Colour} 60%
  );
  & .title {
    mix-blend-mode: difference;
    color: white;
    margin-top: 10px;
  }
  & .subtitle {
    mix-blend-mode: difference;
    color: #6c6c6c;
    display: flex;
    margin-bottom: 9%;
    justify-content: space-around;
  }
`;
const MovieWidget = ({ title, poster_path, original_language,release_date }) => {
  const [Colour, setColour] = useState();
  const image = poster_path
    ? `https://image.tmdb.org/t/p/w300/${poster_path}`
    : Noposter;
  const Getcolor = async () => {
    const color = await prominent(image, {
      amount: 1,
      format: "hex",
    });
    setColour(color);
  };
  useEffect(() => {
    Getcolor();
  }, []);

  return (
    <WidgetContainer>
      <img src={image} alt="" />
      <BottomContainer Colour={Colour}>
        <div className="title">{title}</div>
        <div className="subtitle">
          <div>{original_language}</div>
          <div>{release_date}</div>
        </div>
      </BottomContainer>
    </WidgetContainer>
  );
};

export default MovieWidget;
