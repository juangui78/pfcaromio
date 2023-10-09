import {
    GET_PRODUCTS,
    GET_RESTAURANTS,
    GET_RESTAURANT,
    ORDER_BY_NAME,
    ORDER_BY_RATING,
    OPEN_PRODUCT_DETAILS,
    CLOSE_PRODUCT_DETAILS,
    OPEN_CART,
    CLOSE_CART,
    ADD_CART_ITEM,
    REMOVE_CART_ITEM,
    DELETE_CART_ITEM,
    CLEAR_CART,
    SET_RESTAURANT,
    CREATE_CHECKOUT,
    ERROR
} from "./actionsTypes";

import axios from 'axios';

export const getProducts = () => {
    return async function (dispatch) {
        try {
            const { data } = await axios.get("http://localhost:3004/products/");
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

export const setRestaurant = (restaurant) => {
    return async function (dispatch) {
        try {
            return dispatch(
                { type: SET_RESTAURANT, payload: restaurant },
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
            const { data } = await axios.get("http://localhost:3004/stores/");

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

export const getStore = (id) => {

    return async function (dispatch) {
        try {
            const { data } = await axios.get(`http://localhost:3004/stores/${id}`);
            return dispatch(
                { type: GET_RESTAURANT, payload: data },
            )
        }
        catch (error) {
            return dispatch(
                { type: ERROR, payload: error.message }
            )
        }
    }
}

export function orderByName(payload) { 
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function sortedByRating(order) {
    return {
      type: ORDER_BY_RATING,
      payload: order,
    };
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
            return dispatch(
                { type: ADD_CART_ITEM, payload: item },
            )
        }
        catch (error) {
            return dispatch(
                { type: ERROR, payload: error.message }
            )
        }
    }
}

export const removeItemCart = (item) => {
    return async function (dispatch) {
        try {
            return dispatch(
                { type: REMOVE_CART_ITEM, payload: item },
            )
        }
        catch (error) {
            return dispatch(
                { type: ERROR, payload: error.message }
            )
        }
    }
}

export const deleteItemCart = (item) => {
    return async function (dispatch) {
        try {
            return dispatch(
                { type: DELETE_CART_ITEM, payload: item },
            )
        }
        catch (error) {
            return dispatch(
                { type: ERROR, payload: error.message }
            )
        }
    }
}

export const clearCart = () => {
    return async function (dispatch) {
        try {
            return dispatch(
                { type: CLEAR_CART },
            )
        }
        catch (error) {
            return dispatch(
                { type: ERROR, payload: error.message }
            )
        }
    }
}

export const createCheckout = (cartDetails) => {
    return async function (dispatch) {
        try {
            const {data } = await axios.post('http://localhost:3004/payment/create-checkout', cartDetails);
            console.log(data.url);
          
            return dispatch(
                { type: CREATE_CHECKOUT, payload: data.url},
            )
        }
        catch (error) {
            return dispatch(
                { type: ERROR, payload: error.message }
            )
        }
    }
}
