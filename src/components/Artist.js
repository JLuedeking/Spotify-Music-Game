import React from "react";
import styled from "styled-components";

const StyledArtist = styled.button`
  border-radius: 5px;
  padding: 40px 50px;
  width: 90%;
  margin-inline: auto;
  font-weight: 700;
  font-size: 3rem;
  margin-bottom: 15px;
  &:hover {
    background-color: rgb(227, 227, 227);
  }

  @media (min-width: 70em) {
    padding: 20px 50px;
    font-size: 1rem;
    margin-bottom: 0px;
  }
`

const Artist = (props) => {
  return (
    <StyledArtist onClick={props.answer}>{props.name}</StyledArtist>
  );
};

export default Artist;
