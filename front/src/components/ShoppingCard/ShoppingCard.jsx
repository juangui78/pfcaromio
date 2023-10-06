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
    const cartDetails = useSelector((state) => state.cartDetails);
    const itemsCount = useSelector(state => state.cartDetails.itemsCount);


    return (
        <>
            <Container right={showCart ? "0%" : "-35%"}>
                <Header>
                    <Title>Tu carrito</Title>
                    <CloseButton onClick={() => dispatch(closeCart())}>
                        <IconContext.Provider value={{ style: { color: 'black', width: '24px', height: '24px', padding: '0' } }} >
                            <FaTimesCircle />
                        </IconContext.Provider>
                    </CloseButton>
                </Header>

                <Empty style={{ display: itemsCount ? 'none' : 'flex' }}>
                    <span>Aún no tienes productos en tu carrito</span>
                    <ButtonStart onClick={() => dispatch(closeCart())}>Iniciar compra</ButtonStart>
                </Empty>
                <Body>
                    {
                        cartDetails.items.map((item, index) => (
                            <ItemCart key={'item' + item._id} item={item} />
                        ))
                    }
                </Body>

                <Totales>
                    <strong>Subtotal: </strong>
                    {` $ ${parseFloat(cartDetails.subtotal).toFixed(2)}`}
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

const Body = styled.div`
    background-color: white;
    border-top: 1px solid var(--gray);
    padding: 1rem;
    justify-content: space-between;
`;

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

const Totales = styled.div`
    padding: 1rem;
    text-align: right;
    padding-right: 3rem;
    border-top: 3px solid var(--gray);
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
    background: rgba(0,0,0, 0.5) ;
    transition:0.5s all;
    display: flex;
`;