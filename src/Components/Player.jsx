import React from "react";
import YouTube from "react-youtube";
import styled from "styled-components";

const PlayerContainer = styled.div`
  margin: 10px 0;
`;
const Player = ({ id }) => {
  return (
    <PlayerContainer>
      <YouTube
        videoId={id}
        opts={{ width: "100%", height: "350px", borderRadius: "10px" }}
      />
    </PlayerContainer>
  );
};

export default Player;
