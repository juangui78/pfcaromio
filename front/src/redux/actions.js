import {
    GET_PRODUCTS,
    GET_RESTAURANTS,
    OPEN_PRODUCT_DETAILS,
    CLOSE_PRODUCT_DETAILS,
    OPEN_CART,
    CLOSE_CART,
    ADD_CART_ITEM,
    ERROR
} from "./actionsTypes";

import { ProductsData } from '../components/Products/data' // ! Data de prueba 

import axios from 'axios';

export const getProducts = () => {
    return async function (dispatch) {
        try {
            const {data} = await axios.get("http://localhost:3004/products/");
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
//            const data = RestaurantsData;
            const {data} = await axios.get("http://localhost:3004/stores/");

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

export const openCart = () => {
    return async function (dispatch) {
        try {
            return dispatch(
                { type: OPEN_CART },
            )
        }
        catch (error) {
            return dispatch(
                { type: ERROR, payload: error.message }
            )
        }
    }
}

export const closeCart = () => {
    return async function (dispatch) {
        try {
            return dispatch(
                { type: CLOSE_CART },
            )
        }
        catch (error) {
            return dispatch(
                { type: ERROR, payload: error.message }
            )
        }
    }
}
export const addItemCart = (item) => {
    
    return async function (dispatch) {
    
        try {
            return console.log(item);
            return dispatch(
                { type: ADD_CART_ITEM, payload:item },
            )
        }
        catch (error) {
            return dispatch(
                { type: ERROR, payload: error.message }
            )
        }
    }
}
