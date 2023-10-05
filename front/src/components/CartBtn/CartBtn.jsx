import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { openCart } from '../../redux/actions';

import {
    BtnContainer,
    Button,
    CartIcon
} from './CartBtnStyles';

const CartBtn = () => {

    const dispatch = useDispatch();

    return (
        <BtnContainer>
            <Button onClick={() => dispatch(openCart())}> <CartIcon src='chopingCart.png' /> </Button>
        </BtnContainer>
    )
}

export default CartBtn;
