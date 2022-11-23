import React from "react"
import styled from "styled-components"

const StyledPoints = styled.h2`
    text-align: center;
    height: fit-content;
    position: absolute;
    font-size: 4rem;
    bottom: 0;
    right: 0;
    width: 100%;
    grid-column: 3 / 4;

    span {
        display: block;
        font-size: 4rem;
    }
    
    @media (min-width: 70em) {
        text-align: right;
        font-size: 1.5rem;
        bottom: 0;
        right: 0;

        span {
            display: unset;
            font-size: 1.5rem;
        }
    }
`

const Points = (props) => {
    return (
        <StyledPoints>{window.innerWidth < 1000 ? "Points" : "Points Gained:" } <span>{props.pointTotal}</span></StyledPoints>
    )
}

export default Points