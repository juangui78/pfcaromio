
import { NavLink } from "react-router-dom";

import styled from 'styled-components';

export const Editar = styled.button`
    border-radius: 10px;
    &:hover {
        background-color: red;
    }
`;

export const CardContainer = styled.div`
    color: var(--red);
    margin-left: 8px;
    width: 250px;
    box-shadow: 2px 4px 10px gray;
    border-radius: 8px; 
    background-color: #ffb731;
    transition: 0.3s;
    &:hover {
        transform: scale(102%);
        background-color: beige;
    }
`;

export const ProductItem = styled.div`
    transition: 0.3s;
    text-align: center;
    padding: 1rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    align-items: center;
    display: flex;
    flex-direction: column;
    
`;

export const Price = styled.div`
    margin-top: -1rem;
    margin-bottom: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    font-size: large;
    color: #FFF; 
    font-weight: bolder;
    width: 100px;
    background-color: var(--red);
`; 

export const ImgContainer = styled.div`
    width: 180px;
    height: 180px;
    position: relative;
    margin-top: -2rem;
    margin-bottom: 1rem;
    padding: 0.3rem;
    background-color: var(--red);
    border-radius: 50%;
`;
export const Img = styled.img`
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 50% ;
`; 

export const Details = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-left: 0.2rem;
    padding-right: 0.2rem ;
    row-gap: 1rem;
    width: 100%;
`; 

export const Name = styled.h5`
    transition: 0.5s;
    height: 25px;
    color: black;
    font-weight :700 ;
    margin-top: 0.2rem;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  
`; 

export const Score = styled.div`
    position: relative;
    background-color: #FFF;
    width: 60px;
    text-align: center ;
    color: black;
`; 

export const RowBottom = styled.div`
    display: flex;
    width: 300px;
    justify-content: space-between;
    margin-left: 1rem;
`; 

export const LinkCard = styled.button`
    width: 80%;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1rem;
    font-weight: 500;
    font-family: inherit;
    background-color: red;
    cursor: pointer;
    transition: border-color 0.5s;
    margin-top: 0.3rem;
    &:hover{
        color: white;
        background-color: #333;

    }
`;
