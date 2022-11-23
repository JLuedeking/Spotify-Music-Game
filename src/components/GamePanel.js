import React from "react";
import styled from "styled-components";

const StyledGamePanel = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: space-evenly;
    margin-bottom: 2rem;
    position: relative;

    @media (min-width: 70em) {
        grid-template-columns: 2fr 1fr 2fr;
    }
`

const GamePanel = ({children}) => {
    return (
        <StyledGamePanel>
            {children}
        </StyledGamePanel>
    )
}

export default GamePanel