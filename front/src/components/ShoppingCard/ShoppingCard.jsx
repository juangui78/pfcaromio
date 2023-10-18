import { IconContext } from "react-icons";
import { FaTimesCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { React, useState, useEffect } from 'react';

import ItemCart from '../ItemCart/ItemCart';

import { closeCart, clearCart, createCheckout, getEmailKeys } from '../../redux/actions';

import {
    Container,
    CloseButton
} from './ShoppingCardStyles'

import styled from 'styled-components';

const Message = ({ message }) => (
    <section>
        <p>{message}</p>
    </section>
);

const ShoppingCard = () => {

    const dispatch = useDispatch();
    const [message, setMessage] = useState("");

    const showCart = useSelector((state) => state.modalCart);

    const paymentUrl = useSelector(state => state.paymentUrl);

    let cartDetails = useSelector((state) => state.cartDetails);
    let itemsCount = useSelector(state => state.cartDetails.itemsCount);
    if (itemsCount === 0) {
        cartDetails = JSON.parse(localStorage.getItem('cartDetails'));
    }
    itemsCount = cartDetails ? cartDetails.itemsCount : 0;

    const handleClickOverlay = (e) => {
        if (e.target.id === "overlay") dispatch(closeCart())
        setMessage("");
    };

    const handlePayment = (e) => {
        dispatch(createCheckout(cartDetails))
    };


    useEffect(() => {

        if (paymentUrl) {
            window.location.replace(paymentUrl);
        }
    }, [paymentUrl])

    return (
        <>
            <Overlay id="overlay" onClick={handleClickOverlay} style={{ display: showCart ? "" : "none" }} />
            <Container $right={showCart ? "0%" : "-35%"}>

                <Header>
                    <Title>Tu carrito</Title>
                    <CloseButton onClick={() => dispatch(closeCart())}>
                        <IconContext.Provider value={{ style: { color: 'black', width: '24px', height: '24px', padding: '0' } }} >
                            <FaTimesCircle />
                        </IconContext.Provider>
                    </CloseButton>
                </Header>

                {
                    cartDetails && cartDetails.store &&
                    <StoreDetails>
                        <StoreName> {cartDetails.store.name}</StoreName>
                        <StoreAddress> {cartDetails.store.address}</StoreAddress>
                    </StoreDetails>
                }


                <Empty style={{ display: itemsCount ? 'none' : 'flex' }}>
                    <span>Aún no tienes productos en tu carrito</span>
                    <ButtonStart onClick={() => dispatch(closeCart())}>Iniciar compra</ButtonStart>
                </Empty>

                <Body>
                    {
                        cartDetails && cartDetails.items?.map((item, index) => (
                            <ItemCart key={'item' + item._id} item={item} />
                        ))
                    }
                </Body>

                <Totales style={{ display: itemsCount ? '' : 'none' }}>
                    {
                        cartDetails && 
                        <>
                            <li>{`Subtotal: $ ${parseFloat(cartDetails.subtotal).toFixed(2)}`} </li>
                            <Total><strong>{`Total a pagar: $ ${parseFloat(cartDetails.total).toFixed(2)}`}</strong></Total>
                        </>
                    }
                </Totales>

                <Footer style={{ display: itemsCount ? 'flex' : 'none' }}>
                    <ButtonClear onClick={() => dispatch(clearCart())}> Vaciar carrito</ButtonClear>
                    <ButtonPay onClick={handlePayment}> Ir a pagar</ButtonPay>
                </Footer>

            </Container>

        </>
    )
}

export default ShoppingCard

const Body = styled.div`
    background-color: white;
    border-top: 1px solid var(--gray);
    padding: 1rem;
    justify-content: space-between;
`;


const StoreDetails = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: .5rem;
    background-color: white;
    border-top: 1px solid var(--gray);
`;

const StoreName = styled.span`
    font-weight: 500;
    text-transform: uppercase;
    font-size: small;
`;

const StoreAddress = styled.span`
    font-weight: 200;
    text-transform: capitalize;
    font-size: small;
`;

const Header = styled.div`
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    border-bottom: 2px solid #DDD;
`;

const Empty = styled.div`
    padding: 2rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    background-color: white;
    border-top: 6px solid var(--gray);
    height: 20%;
    gap :2rem;
    
`;

const ButtonStart = styled.button`
    background-color: orange;
        &:hover{
        background-color: var(--orange);
        color:var(--red);
    }  
`;

const ButtonPay = styled.button`
   background-color: green;
`;

const ButtonClear = styled.button`
   background-color: grey;
`;

const Footer = styled.div`
    background-color: white;
    border-top: 3px solid var(--gray);
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    row-gap: 2rem;
    column-gap: 2rem;
`;

const Totales = styled.ul`
    padding: 1rem;
    text-align: right;
    padding-right: 3rem;
    border-top: 3px solid var(--gray);
    background-color: white;
    font-weight: 500;
    font-size: medium;
    list-style-type: none;
    margin: 0;
`;

const Total = styled.li`
    border-top: 1px solid #CCC;
    background-color: white;
    font-weight: 700;
    font-size: large;
`;

const Title = styled.span`
    font-size: x-large;
    font-weight: 700;
`;

const Overlay = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0, 0.3) ;
    display: flex;

`;

