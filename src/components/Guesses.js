import React from "react"
import styled from "styled-components"

const StyledGuesses = styled.h2`
    text-align: center;
    height: fit-content;
    position: absolute;
    font-size: 4rem;
    bottom: 0;
    right: 0;
    width: 100%;
    grid-column: 1 / 2;

    span {
        display: block;
        font-size: 4rem;
    }

    @media (min-width: 70em) {
        text-align: left;
        font-size: 1.5rem;
        bottom: 0;
        right: 0;

        span {
            display: unset;
            font-size: 1.5rem;
        }
    }
`

const Guesses = (props) => {
    return (
        <StyledGuesses>{window.innerWidth < 1000 ? "Guesses" : "Guesses Left:" } <span>{props.guessTotal}</span></StyledGuesses>
    )
}

export default Guesses