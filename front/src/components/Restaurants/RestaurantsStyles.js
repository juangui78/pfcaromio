import styled from 'styled-components';


export const Dialog = styled.dialog`
    background: white;
    border:1 solid red;
    color: #CCC;
    border-radius: 8px;
    box-shadow: #CCC;
    width: 340px;
`;

export const DialogIcon = styled.span`
    font-size: xxx-large;
    color:  ${(props) => props.$modaltype === 'success' ? 'green' : 'red'};
`;

export const DialogMessage = styled.section`
    color: #777;
    font-size: large;
    text-align: center;
`;

export const AceptButtonDialog = styled.button`
    color: white;
    background-color:  ${(props) => props.$modaltype === 'success' ? 'green' : 'red'};
    width: 260px;
`;

export const Container = styled.div`
    margin-top: 4rem;
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
    margin-top: 40px;
    text-align: center;
    font-size: 24pt;
    color:var(--red);
    font-family: 'Secular One', 'sans-serif';
`;

export const NoFound = styled.h3`
    width: 100%;
    text-align: center;
    font-size: 16pt;
    color:var(--red);
    font-family: 'Secular One', 'sans-serif';
`;

export const ButtonBack = styled.button`
    font-size: 1rem;
    font-weight: 300;
`;

export const Cards = styled.div`
    padding: 1rem 1rem 0rem 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap:2rem;
`;

export const Descuentos = styled.div`
    margin-top: 2rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${(props) => props.$isSignedIn ? '4rem' : ''};
    
`;

