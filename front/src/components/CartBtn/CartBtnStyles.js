import styled from "styled-components";

export const BtnContainer = styled.div`
    color:black;
    padding-left:1rem;
    padding-right:1rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: start;
    
`;

export const Button = styled.button`
    color:black;
    padding:0.5rem;
    background-color: transparent;
    border: none;
    position: relative;
`;

export const CartIcon = styled.img`
   width: 48px;
`;

export const Badge = styled.span`
    position: absolute;
    bottom: 16px;
    left:16px;
    background-color: #07af07;
    border:1px solid white;
    display:flex;
    font-size: 9pt;
    color: white;
    font-weight: 600;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    text-align: center;
    align-content: center;
    justify-content: center;
`;

