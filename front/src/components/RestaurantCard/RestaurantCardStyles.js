import { NavLink } from "react-router-dom";

import styled from 'styled-components';

export const CardContainer = styled.div`
    width: 320px;
    border-radius: 10px; 
    background-color: #FFF;
    transition: 0.5s;
    box-shadow: 2px 4px 10px gray;
    &:hover {
        transform: scale(102%);
        background-color: beige;
        box-shadow: 2px 4px 10px gray;
    }
`;

export const Address = styled.div`
    color: black;
    font-size: 0.8rem;
`;
export const RestaurantItem = styled.div`
    text-align: center;
    align-items: center;
    display: flex;
    flex-direction: row;
`;

export const ImgContainer = styled.div`
    width: 150px;
    height: 100px;
    position: relative;
    padding: 1rem;
`;
export const Img = styled.img`
    object-fit: cover;
    width: 100%;

    border-radius: 8px;
`; 

export const Details = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
`; 

export const Name = styled.h5`
    height: 25px;
    color: black;
    font-weight :700 ;
    margin-top: 0.2rem;
    margin-bottom: 1rem;
    font-size: 1.2rem;
`; 

export const Score = styled.div`
    position: relative;
    background-color: #F3F3F3;
    width: 60px;
    text-align: center ;
    color: #777;
`; 


export const LinkCard = styled(NavLink)`
    width: 60%;
    color: var(--red);
    text-decoration: none;
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.5em 1em;
    font-size: 1rem;
    font-weight: 500;
    font-family: inherit;
    background-color: var(--orange);
    cursor: pointer;
    transition: border-color 0.5s;
    margin-top: 0.3rem;
    &:hover{
        color: #1a1a1a;
        background-color: var(--orange);
    }
`;