import {
    GET_PRODUCTS,
    GET_RESTAURANTS,
    OPEN_PRODUCT_DETAILS,
    CLOSE_PRODUCT_DETAILS,
    ERROR
} from "./actionsTypes";

import { ProductsData, RestaurantsData } from '../components/Products/data' // ! Data de prueba 

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
export const getProductsByStore = (id) => {
    return async function (dispatch) {
        try {
            //const data = await ...;
            const data = ProductsData.filter((product) => product.storeId === id);
            console.log(data)
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

export const getRestaurants = () => {
    return async function (dispatch) {
        try {
            //const data = await ...;
            const data = RestaurantsData;
            return dispatch(
                { type: GET_RESTAURANTS, payload: data },
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
                { type: OPEN_PRODUCT_DETAILS, payload: id },
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
