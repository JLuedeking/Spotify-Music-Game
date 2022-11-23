import React from "react";
import styled from "styled-components";

const StyledArtistSelector = styled.div`
    display: grid;
    flex-direction: row;
    align-content: center;
    margin-top: 20px;
    padding-bottom: 20px;
    max-width: 500px;
    align-items: center;
    border: 1px solid #eeeeee;
    box-shadow: 0px 2.98256px 7.4564px rgba(0, 0, 0, 0.07);
    width: 100%;
    height: 130px;
    grid-gap: 1rem;
    min-width: 100%;
    height: 100%;
    grid-auto-flow: row;
    grid-template-columns: 1fr;

    h2 {
        text-align: center;
        margin-bottom: 0.8rem;
        grid-column: 1 / 2;
        font-size: 3.2rem;
    }

    @media (min-width: 70em) {
        grid-template-columns: 1fr 1fr;

        h2 {
            font-size: 1.5rem;
            grid-column: 1 / 3;
        }
    }
`

const ArtistSelector = ({children}) => {
    return (
        <StyledArtistSelector>
            {children}
        </StyledArtistSelector>
    )
}

export default ArtistSelector