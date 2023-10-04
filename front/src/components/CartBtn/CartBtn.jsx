import React from 'react'
import styled from 'styled-components';
import {
    BtnContainer,
    Button,
    CartIcon
} from './CartBtnStyles';

const CartBtn = () => {
    return (
        <BtnContainer>
            <Button> <CartIcon src='chopingCart.png' /> </Button>
        </BtnContainer>
    )
}

export default CartBtn;


