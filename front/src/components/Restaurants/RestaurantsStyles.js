import styled from 'styled-components';

export const Container = styled.div`
    padding: 2rem;
    gap: 4rem;
    flex-wrap: nowrap;
    flex-direction: column;

    @media (max-width: 800px) {
        padding: 4rem 0rem 0rem 0rem;
    } 
`;

export const Title = styled.h1`
    width: 100%;
    margin-left: 20px;
    font-size: 24pt;
    color:var(--red);
    font-family: 'Secular One', 'sans-serif';
`;

export const Cards = styled.div`
    padding: 1rem 1rem 0rem 1rem;
    display: grid;
    grid-template-columns: 
        repeat(
            auto-fit,
            minmax(340px, 340px)
        );
    gap:2rem;
`;

export const Descuentos = styled.div`
    margin-top: 2rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    
`;

