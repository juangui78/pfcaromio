import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { openCart } from '../../redux/actions';

import { IconContext } from "react-icons";
import { FaShoppingCart } from 'react-icons/fa';

import {
    BtnContainer,
    Button,
    Badge
} from './CartBtnStyles';

const CartBtn = () => {

    const dispatch = useDispatch();

    let itemsCount = useSelector(state => state.cartDetails.itemsCount);
    const cardDetails = JSON.parse(localStorage.getItem('cartDetails'));
    !cardDetails &&  localStorage.setItem('cartDetails', JSON.stringify({}));
    if(itemsCount === 0) {
        itemsCount = cardDetails.itemsCount;
    } 

    return (
        <BtnContainer>
            <Button onClick={() => dispatch(openCart())}>
                <IconContext.Provider value={{ style: { color: 'gray', width: '25px', height: '25px', padding: '0', display: 'flex', justifyContent: 'center', alignItems: 'center'} }} >
                    <FaShoppingCart />
                    <Badge style={{ display: itemsCount ? 'flex' : 'none' }}>{itemsCount}</Badge>
                </IconContext.Provider>
            </Button>
        </BtnContainer>
    )
}

export default CartBtn;


