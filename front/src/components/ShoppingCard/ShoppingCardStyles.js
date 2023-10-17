import styled from 'styled-components';

export const Container = styled.div`
    position: fixed;
    width: 30vw;
    height: 100vh;
    background-color: var(--gray);
    color: black;
    top: 0;
    right: ${(props) => props.$right} ;
    transition:0.3s;
    box-shadow: 5px 0px 20px 5px gray;
    z-index: 200;
`;

export const CloseButton = styled.button`
    background-color: transparent;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    padding: 0;
    border:none;
    :hover {  
        border:none;
    }
`;
