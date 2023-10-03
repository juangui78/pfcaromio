//import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { closeProductDetails } from '../../redux/actions';

import {

} from './ProductDetailsStyles'

export default function ProductDetails({ show, toggleState }) {

    const dispatch = useDispatch();

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                dispatch(closeProductDetails())
          }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    /* const [product, setProduct] = useState({
        "id": 1034567896,
        "name": "Pizza Chicago",
        "price": "$39.900",
        "rating": "45",
        "description": "Conocida en muchos lugares como pizza de sartén o deep dish, la verdadera Chicago se asemeja mucho a un pay, ya que su preparación en una cacerola metálica le brinda su peculiar forma.",
        "image": "https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=300",
    }); */
    const product = useSelector((state) => state.product);
    return (
        <>
            {show &&
                <Overlay>
                    <ModalContainer>
                        <Header> ⭐{product.rating} </Header>
                        <CloseBtn onClick={() => dispatch(closeProductDetails())}> X </CloseBtn>
                        <Details>
                            <ImgContainer>
                                <Img src={product.image} alt="" />
                            </ImgContainer>
                            <Description>
                                <Name>{product.name}</Name>
                                <Summary>{product.description}</Summary>
                                <Price>{product.price}</Price>
                                <Footer>
                                    <button onClick={() => dispatch(closeProductDetails())}>Agregar al carrito</button>
                                </Footer>
                            </Description>
                        </Details>
                    </ModalContainer>
                </Overlay>
            }

        </>
    );
}


const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0, 0.5) ;
    display: flex;
    align-items: center;
    justify-content: center;
    
`;

const ModalContainer = styled.div`
    width: 860px;
    min-height: 100px;
    background-color: #FFF;
    position: relative;
    border-radius: 5px;
    box-shadow: rgba(100,100,111, 0.2) 0px 7px 29px 0px ;
    padding: 20px;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--red);
    color: var(--red);
    font-weight: 700;
    font-size: large;
    
`;

const CloseBtn = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    color: gray;
    width: 20px;
    height: 30px;
    padding-left: 8px;
    padding-top: 6px;
    border: 1px solid;
    cursor: pointer;
    transition: .3s ease all;
    border-radius: 3px;
    &:hover{
        color: black;   
}
`;
export const Details = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: space-between;
`;

const ImgContainer = styled.div`
    width: 320px;
    height: 320px;  
`;

export const Img = styled.img`
    object-fit: cover;
    width: 100%;
    height: 100%;
`;

export const Description = styled.div`
   color: black;
   width:60%;
   flex: 1 1 auto;
   padding-left: 2rem ;
   padding-right: 2rem ;
   display: grid;
   align-content: space-between;
`;

export const Name = styled.h2`
    display: flex;
    margin: auto 0;
    justify-content: center;
    font-size: xx-large;
    color:var(--red)
`;

export const Price = styled.h2`
    display: flex;
    margin: auto 0;
    justify-content: center;
    font-size: x-large;
`;
export const Summary = styled.p`
    height: 6rem;
    text-align: center;
`;
export const Footer = styled.footer`
    display: flex;
    margin: auto 0;
    justify-content: center;
`;