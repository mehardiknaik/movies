import React from "react";
import styled from "styled-components";
import Noposter from "../Images/Noposter.jpg";
import calendar from "../Images/calendar.svg";
import star from "../Images/star.svg";
import clock from "../Images/clock.svg";
import dayjs from "dayjs";
import breakpoint from "styled-components-breakpoint";

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
  & .subtitle {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #6a6a6a;
    gap: 10px;
  }
`;

const MovieDatils = ({
  poster_path,
  title,
  release_date,
  vote_average,
  runtime,
}) => {
  const image = poster_path
    ? `https://image.tmdb.org/t/p/w300/${poster_path}`
    : Noposter;

  return (
    <TopContainer>
      <div className="imageContainer">
        <img src={image} width={"100%"} height={"100%"} alt="" />
      </div>
      <div>
        <div>{title}</div>
        <SubTitleContainer>
          <div className="subtitle">
            <img src={calendar} width={14} height={14} alt="" />
            <div>{dayjs(release_date).format("D-MMM-YYYY")}</div>
          </div>
          {vote_average > 0 && <div className="subtitle">
            <img src={star} width={14} height={14} alt="" />
            <div>{vote_average}</div>
          </div>}
          {runtime > 0 && (
            <div className="subtitle">
              <img src={clock} width={14} height={14} alt="" />
              <div>{`${parseInt((runtime / 60) % 24)} Hours ${
                runtime % 60
              } Minutes`}</div>
            </div>
          )}
        </SubTitleContainer>
      </div>
    </TopContainer>
  );
};

export default MovieDatils;
