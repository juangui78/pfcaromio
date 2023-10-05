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

    //const cartItemsCount = useSelector(state=> state.cartReducer.itemsCount);

    const cartItemsCount = 0; 
    
    return (
        <BtnContainer>
            <Button onClick={() => dispatch(openCart())}>
                <IconContext.Provider value={{ style: { color: 'black', width: '25px', height: '25px', padding: '0' , display: 'flex', justifyContent: 'center', alignItems:'center'} }} >
                    <FaShoppingCart />
                    <Badge style={{display: cartItemsCount ? 'flex' : 'none'}}>{cartItemsCount}</Badge>
                </IconContext.Provider>
            </Button>
        </BtnContainer>
    )
}

export default CartBtn;


