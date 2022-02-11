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
const ButtonContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 7px 19px;
  margin-right: 20px;
  ${breakpoint("sm")`
  flex-direction: row;
  margin-right: 0;
`}
`;

const Widget = styled.div`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 20%) 0px 3px 3px -2px,
    rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px;
  & .title {
    font-size: 20px;
  }
`;
const GenresContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 5px 0 5px 26px;
`;
const MovieDatils = ({
  poster_path,
  title,
  release_date,
  vote_average,
  runtime,
  genres,
  spoken_languages,
  overview,
}) => {
  const image = poster_path
    ? `https://image.tmdb.org/t/p/w300/${poster_path}`
    : Noposter;

  return (
    <>
      <TopContainer>
        <div data-aos="fade-left" className="imageContainer">
          <img src={image} width={"100%"} height={"100%"} alt="" />
        </div>
        <div data-aos="fade-right">
          <div>{title}</div>
          <SubTitleContainer>
            <div className="subtitle">
              <img src={calendar} width={14} height={14} alt="" />
              <div>{dayjs(release_date).format("D-MMM-YYYY")}</div>
            </div>
            {vote_average > 0 && (
              <div className="subtitle">
                <img src={star} width={14} height={14} alt="" />
                <div>{vote_average}</div>
              </div>
            )}
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
      <ButtonContainer>
        <Widget data-aos="fade-up">
          {genres.length > 0 && (
            <>
              <div className="title">Genres</div>
              <GenresContainer>
                {genres.map((genre) => (
                  <div key={genre.id}>{genre.name}</div>
                ))}
              </GenresContainer>
            </>
          )}
          {spoken_languages.length > 0 && (
            <>
              <div className="title">Language</div>
              <GenresContainer>
                {spoken_languages.map((language, index) => (
                  <div key={index}>{language.english_name}</div>
                ))}
              </GenresContainer>
            </>
          )}
        </Widget>
        {overview && (
          <Widget data-aos="fade-up">
            <div className="title">overview</div>
            <div style={{ margin: "5px 0 5px 26px" }}>{overview}</div>
          </Widget>
        )}
      </ButtonContainer>
    </>
  );
};

export default MovieDatils;
