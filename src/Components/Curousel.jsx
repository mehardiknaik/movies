import dayjs from "dayjs";
import React, { useContext } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { TypeContext } from "../Context/Typestate";
import { motion } from "framer-motion";

const CurouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  object-fit: contain;
  padding: 10px;
  & img {
    border-radius: 4px;
    margin-bottom: 5px;
    box-shadow: 0px 0px 5px black;
  }
`;
const TitleContainer = styled.div`
  height: 100px;
  width: 100%;
  margin-top: -100px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 10%,
    rgb(20 20 20) 95%
  );
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  color: white;
  display: flex;
  align-items: flex-start;
  font-size: 14px;
  flex-direction: column;
  justify-content: end;
  & .subtitle {
    font-size: 12px;
    color: #b6b6b6;
  }
  & div {
    margin-left: 10px;
    margin-bottom: 10px;
  }
`;
const animation = {
  hidden: {
    opacity: 0,
    y: -100,
  },
  visible: {
    opacity: 1,
    y:0,
    transition: {
      duration: 1.3,
      // ease: "easeInOut",
    },
  },
};

const Curousel = ({ upcomingmovies }) => {
  const { type } = useContext(TypeContext);
  const items = upcomingmovies
    .filter((c) => (c.backdrop_path ? c : false))
    .map((item, index) => {
      return (
        <Link to={`/${type}=${item.id}`}>
          <CurouselContainer key={index}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
              alt="First slide"
            />
            <TitleContainer>
              <div>{item.title || item.name}</div>
              <div className="subtitle">
                {dayjs(item.release_date || item.first_air_date).format(
                  "D-MMMM-YYYY"
                )}
              </div>
            </TitleContainer>
          </CurouselContainer>
        </Link>
      );
    });

  const responsive = {
    0: {
      items: 1,
    },
    720: {
      items: 2,
    },
  };

  return (
    <motion.div
      variants={animation}
      initial="hidden"
      animate="visible"
      className="imageContainer"
    >
      <AliceCarousel
        mouseTracking
        infinite
        disableButtonsControls
        items={items}
        autoPlay
        disableDotsControls
        autoPlayInterval={1500}
        animationDuration={1000}
        responsive={responsive}
        keyboardNavigation
        renderSlideInfo={(e) => console.log("slide change", e)}
      />
    </motion.div>
  );
};

export default Curousel;
