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
    color:  ${(props) => props.modalType === 'success' ? 'green': 'red'};
`;

export const DialogMessage = styled.section`
    color: #777;
    font-size: large;
    text-align: center;
`;

export const AceptButtonDialog = styled.button`
    color: white;
    background-color:  ${(props) => props.modalType === 'success' ? 'green': 'red'};
    width: 260px;
`;

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

