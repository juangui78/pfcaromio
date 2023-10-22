import React from 'react'
import styled from 'styled-components'
import {FaPlusCircle, FaMinusCircle, FaTrash} from 'react-icons/fa';
import { addItemCart, removeItemCart, deleteItemCart } from '../../redux/actions';
import { useDispatch } from "react-redux";

const ItemCart = ({ item }) => {

  const dispatch = useDispatch();

  return (
    <Container>
      <ImgContainer>
        <Img src={item.image} alt="" />
      </ImgContainer>
      <Detail>
        <Name>{item.name}</Name>
        <Price>{`$ ${parseFloat(item.price).toFixed(2)}`}</Price>
      </Detail>
      <Quantity>
        <Value>
          {item.quantity}
        </Value>
        <Buttons>

          {/* Botón para eliminar item  */}
          <Button onClick={ () => dispatch(deleteItemCart(item))} style={{ display: item.quantity === 1 ? 'flex' : 'none' }}>
            <FaTrash />
          </Button>

          {/* Botón para restar cantidad  */}
          <Button onClick={ () => dispatch(removeItemCart(item))} style={{ display: item.quantity > 1 ? 'flex' : 'none' }}>
            <FaMinusCircle />
          </Button>

          {/* Botón para sumar cantidad  */}
          <Button onClick={ () => dispatch(addItemCart(item))} >
            <FaPlusCircle />
          </Button>
        </Buttons>
      </Quantity>

    </Container>
  )
}

export default ItemCart

const Container = styled.div`
  display: grid;
  grid-template-columns: 42px auto 80px;
  border-bottom: 0px solid #DDD;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  &:hover{
    background-color: #EEE;
  }
`;

const ImgContainer = styled.div`
    border: 0px solid black;
    width: max-content;
`;

const Detail = styled.div`
    color: black;
    padding-left: 1rem;
    padding-right: 1rem;
    line-height: normal;
    border: 0px solid black;
`;
const Name = styled.div`
    font-weight: 100;
`;
const Price = styled.div`
    font-weight: 700;
    font-size: 0.8rem;
`;

const Quantity = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    border-left: 0px solid #AAA;
`;
const Value = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    width: 2rem;
    border: 0px solid black;
`;

const Buttons = styled.div`
    display: flex;;
    border: 0px solid black;
    gap: 2px;
    color:black;
    font-size: 16pt;
    font-weight: lighter;
    padding-right: 0.2rem;
    align-content: end;
    align-items: end;
    justify-content: center;
`;

const Button = styled.button`
    padding: 0;
    background-color: transparent;
    color: black;
    display: flex;
    &:hover{
      color: gray;
    }
`;
const Increment = styled.button`
    display: flex;
    width: 1.5rem;
    align-items: center;
    justify-content: center;
    align-items: center;
    border-radius: 0;
    padding: 0;
    background-color: #AAA;
    border: 0px solid black;
`;
const Decrement = styled.button`
    display: flex;
    width: 1.5rem;
    align-items: center;
    justify-content: center;
    align-items: center;
    border-radius: 0;
    padding: 0;
    background-color: #AAA;
    border: 0px solid black;
`;

const Img = styled.img`
    display: block;
    height: 40px;
    width: 40px;
    margin: 0px auto;
    object-fit: cover;
    object-position: center center;
    opacity: 1;
    border: 0px solid black;
`;