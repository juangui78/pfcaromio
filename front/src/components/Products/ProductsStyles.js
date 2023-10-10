import styled from 'styled-components';

export const Container = styled.div`
    padding: 1rem;
    flex-wrap: nowrap;
    flex-direction: column;
    
    width: 100%;
    @media (max-width: 800px) {
        padding: 4rem 0rem 0rem 0rem;
    } 
`;

export const Title = styled.h1`

    width: 100%;
    text-align: center;
    font-size: 24pt;
    color:var(--red);
    margin-top: -100px;
`;

export const Cards = styled.div`
    padding: 1rem 1rem 0rem 1rem;
    display: grid;
    grid-template-columns: 
        repeat(
            auto-fit,
            minmax(260px, 260px)
        );
    gap:2rem;
`;
