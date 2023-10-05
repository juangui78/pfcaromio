import { IconContext } from "react-icons";
import { FaTimesCircle } from 'react-icons/fa';

import { useDispatch, useSelector } from "react-redux";

import { closeCart } from "../../redux/actions";

import ItemCart from '../ItemCart/ItemCart';

import {
    Container,
    CloseButton
} from './ShoppingCardStyles'

import styled from 'styled-components';

const ShoppingCard = () => {

    const dispatch = useDispatch();

    const showCart = useSelector((state) => state.modalCart);

    const totales = {
        total: 0.0,
    }

    const productos = [
        {
            "id": 1034567894,
            "storeId": '2',
            "name": "Pizza Siciliana",
            "price": "39.900",
            "rating": "95",
            "description": "A diferencia de la pizza napolitana, la masa de este tipo de pizza es más gruesa y se asemeja un poco al pan, por lo que en muchos lugares simplemente le llaman pizza de masa gorda, aunque originalmente llevaba el nombre de Sfincione.",
            "image": "https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=300",
        },
        {
            "id": 1034567895,
            "storeId": '3',
            "name": "Pizza New York",
            "price": "39.900",
            "rating": "75",
            "description": "La pizza New York es famosa por tener una masa delgada pero no crujiente que puede llevarse en la mano y doblar para comerse, además es la reina en cuanto al tipo de ingredientes que introdujo",
            "image": "https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=300",
        }
    ]

    return (
        <>
            <Container right={showCart ? "0%" : "-30%"}>
                <Header>
                    <Title>Tu carrito</Title>
                    <CloseButton onClick={() => dispatch(closeCart())}>
                        <IconContext.Provider value={{ style: { color: 'black', width: '24px', height: '24px', padding: '0' } }} >
                            <FaTimesCircle />
                        </IconContext.Provider>
                    </CloseButton>
                </Header>

                <Empty>
                    <span>Aún no tienes productos en tu carrito</span>
                    <ButtonStart onClick={() => dispatch(closeCart())}>Iniciar a comprar</ButtonStart>
                </Empty>
               
                <Totales>
                    <strong>TSubtotal:</strong>
                    $ {totales.total}
                </Totales>
                <Footer>
                    <ButtonClear> Vaciar carrito</ButtonClear>
                    <ButtonPay> Ir a pagar</ButtonPay>
                </Footer>


            </Container>

        </>
    )
}

export default ShoppingCard

const Item = styled.div`

`;

const Header = styled.div`
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
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
   background-color: green;
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
const Body = styled.div`
    padding: 1rem;
    text-align: center;
`;
const Totales = styled.div`
    padding: 1rem;
    text-align: right;
    padding-right: 3rem;
    border-top: 3px solid var(--gray);
    background-color: white;
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
    background: rgba(0,0,0, 0.5) ;
    transition:0.5s all;
    display: flex;
`;