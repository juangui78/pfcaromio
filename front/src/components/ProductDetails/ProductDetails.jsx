import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { closeProductDetails, addItemCart, getStore } from '../../redux/actions';
import Reviews from '../Reviews/Reviews';

const ProductDetails = ({ show }) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  const handleAddItem = () => {
    dispatch(addItemCart(product));
    dispatch(closeProductDetails());
  };

  const handleClick = (event) => {
    if (event.target.id === 'closeButton') {
      dispatch(closeProductDetails());
    }
  };

  const handleEscape = (event) => {
    if (event.key === 'Escape') {
      dispatch(closeProductDetails());
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <>
      {show && (
        <Overlay id="overlay" onClick={handleClick}>
          <ModalContainer>
            <Header>
              ⭐{product.rating}
              <CloseBtn id="closeButton" onClick={() => dispatch(closeProductDetails())}>
                X
              </CloseBtn>
            </Header>
          <ScrollableContent>
            <Details>
              <ImgContainer>
                <Img src={product.image} alt="" />
              </ImgContainer>
              <Description>
                <Name>{product.name}</Name>
                <Summary>{product.description}</Summary>
                <Price>{product.price}$ Dólares</Price>
                <Footer>
                  <Button onClick={handleAddItem}>Agregar al carrito</Button>
                </Footer>
              </Description>
                </Details>
              <Reviews/>
            </ScrollableContent>
          </ModalContainer>
        </Overlay>
      )}
    </>
  );
};


export default ProductDetails

const ScrollableContent = styled.div`
  max-height: 400px; /* Altura máxima para activar el desplazamiento vertical */
  overflow-y: auto; /* Desbordamiento vertical */
  padding-bottom: 10px; /* Espacio adicional en la parte inferior para evitar que el último elemento se oculte */
`;

const Overlay = styled.div`
    width: 100vw;
    height: 130vh;
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
    margin-bottom: 60px;
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
    background: red;
    color: white;
    width: 20px;
    height: 30px;
    padding-left: 8px;
    padding-top: 3px;
    border: 1px solid;
    cursor: pointer;
    transition: .3s ease all;
    border-radius: 3px;
    &:hover{
        color: white;   
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
border: 1px solid black; /* Añade un borde negro */
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
    margin-top: 60px;
    margin-bottom: -5px;
    justify-content: center;
    font-size: x-large;
`;
export const Summary = styled.p`
    margin-bottom: -10px;
    margin-top: -5px;
    height: 6rem;
    text-align: center;
`;
export const Footer = styled.footer`
    display: flex;
    margin: auto 0;
    justify-content: center;
`;

export const Button = styled.button`
    background-color: black;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background-color: #333;
    }
`;