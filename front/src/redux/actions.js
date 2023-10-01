import {
    GET_PRODUCTS,
    OPEN_PRODUCT_DETAILS,
    CLOSE_PRODUCT_DETAILS,
    ERROR
} from "./actionsTypes";

import { ProductsData } from '../components/Products/data' // ! Data de prueba 

import axios from 'axios';

export const getProducts = () => {
    return async function (dispatch) {
        try {
            //const data = await ...;
            const data = ProductsData;

            return dispatch(
                { type: GET_PRODUCTS, payload: data },
            )
        }
        catch (error) {
            return dispatch(
                { type: ERROR, payload: error.message }
            )
        }
    }
}
export const openProductDetails = (id) => {
    return async function (dispatch) {
        try {
            return dispatch(
                { type: OPEN_PRODUCT_DETAILS, payload:id },
            )
        }
        catch (error) {
            return dispatch(
                { type: ERROR, payload: error.message }
            )
        }
    }
}
export const closeProductDetails = () => {
    return async function (dispatch) {
        try {
            return dispatch(
                { type: CLOSE_PRODUCT_DETAILS },
            )
        }
        catch (error) {
            return dispatch(
                { type: ERROR, payload: error.message }
            )
        }
    }
}
