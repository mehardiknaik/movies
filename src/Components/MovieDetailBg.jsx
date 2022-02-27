import { motion, AnimatePresence } from "framer-motion";
import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { BackgroundContext } from "../Context/BackgroundState";

const BgContainer = styled.div`
  height: 100vh;
  position: fixed;
  width: 100%;
  z-index: -1;
  top: 0;
  & > div {
    height: 100%;
    width: 100%;
    position: absolute;
  }
`;
const IMGanimation = {
  hidden: {
    scale: 1.2,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
  exit: {
    scale: 1.2,
    opacity: 0,
    transition: {
      duration: 1,
    },
  },
};
const MovieDetailBg = ({ backdrop_path, rgba }) => {
  const { background } = useContext(BackgroundContext);
  const [AnimateBg, setAnimateBg] = useState(background);

  useEffect(() => {
    setAnimateBg((bg) => !bg);
  }, [background]);

  return (
    <BgContainer>
      <AnimatePresence>
        {background && backdrop_path && (
          <motion.div
            variants={IMGanimation}
            initial="hidden"
            animate={AnimateBg ? "visible" : "exit"}
            exit="exit"
          >
            <img
              src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
              width={"100%"}
              height={"100%"}
              alt=""
              onLoad={() => setAnimateBg(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div
        style={{
          background: `linear-gradient(45deg, ${rgba})`,
        }}
      ></div>
    </BgContainer>
  );
};

export default MovieDetailBg;
