import axios from 'axios';

import {
    GET_PRODUCTS,
    SET_PRODUCTS,
    GET_RESTAURANTS,
    GET_RESTAURANT,
    GET_SUGGESTIONS,
    SEARCH_PRODUCTS_BY_STORE,
    GET_RESTAURANTS_BY_NAME,
    FILTER_PRODUCTS_BY_NAME,
    FILTER_RESTAURANTS_BY_NAME,
    ORDER_BY_RATING_PRODUCTS,
    ORDER_BY_NAME,
    ORDER_BY_RATING,
    ORDER_BY_PRICE,
    FILTER_BY_RATING,
    OPEN_PRODUCT_DETAILS,
    CLOSE_PRODUCT_DETAILS,
    OPEN_CART,
    CLOSE_CART,
    ADD_CART_ITEM,
    REMOVE_CART_ITEM,
    DELETE_CART_ITEM,
    SET_RESTAURANT,
    CLEAR_CART,
    CREATE_CHECKOUT,
    GET_EMAIL_KEYS,
    SET_SEARCH,
    GET_STORE,

} from './actionsTypes';

const initialState = {
    suggestions: [],
    filteredProducts: [], // Lista filtrada de productos
    filteredRestaurants: [], // Lista filtrada de restaurantes
    filterByRating: null,
    products: [],
    product: {},
    modalProductDetails: false,
    modalCart: false,
    productsByStoreID: [],
    restaurants: [], // * stores
    restaurantSelected: {},
    currentStore: {},
    paymentUrl: null,
    paymentData: null,
    emailKeys: {},
    shippingFee: 0,
    search: false,
    searchBy: 'resturant',

    cartDetails: {
        store: {},
        items: [],
        itemsCount: 0,
        subtotal: 0,
        total: 0,
    }
};

let cartDetails = {};
let itemsCount = 0;
let foundItem = '';
let quantity = 0;
let index = null;

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: payload,
            }

        case SET_PRODUCTS:
            return {
                ...state,
                products: payload,
            }

        case GET_RESTAURANTS:
            return {
                ...state,
                restaurants: payload,
            }

        case GET_RESTAURANT:
            return {
                ...state,
                restaurantSelected: payload,
            }
        case SEARCH_PRODUCTS_BY_STORE:
        const storeID = payload; 
        const productsByStoreID = state.products.filter(product => product.storeID === storeID);
        return {
            ...state,
            productsByStoreID: productsByStoreID,
        };
        case GET_SUGGESTIONS:
            return {
                ...state,
                suggestions: payload, // Almacena las sugerencias en el estado.
            }
            
        case GET_STORE:
            return {
                ...state,
                currentStore: payload,
            }

        case FILTER_PRODUCTS_BY_NAME:
            const productName = payload.toLowerCase();
            const filteredProducts = state.products.filter((product) =>
                product.name.toLowerCase().includes(productName)
            );
            return {
                ...state,
                filteredProducts,
            };

        case FILTER_RESTAURANTS_BY_NAME:
            const restaurantName = payload.toLowerCase();
            const filteredRestaurantsByName = state.restaurants.filter((restaurant) =>
                restaurant.name.toLowerCase().includes(restaurantName)
            );
            return {
                ...state,
                filteredRestaurantsByName,
            };

        case ORDER_BY_NAME:
            let sortedRestaurants = [...state.restaurants];

            if (payload === 'asc') {
                sortedRestaurants.sort((a, b) => a.name.localeCompare(b.name));
            }
            else if (payload === 'desc') {
                sortedRestaurants.sort((a, b) => b.name.localeCompare(a.name));
            }

            return {
                ...state,
                restaurants: sortedRestaurants,
            }
        case ORDER_BY_RATING:
            let sortedRestaurantsRating;

            if (payload === 'low') {
                sortedRestaurantsRating = [...state.restaurants].sort((a, b) => a.rating - b.rating);
            } else if (payload === 'high') {
                sortedRestaurantsRating = [...state.restaurants].sort((a, b) => b.rating - a.rating);
            } else {
                sortedRestaurantsRating = [...state.restaurants].sort((a, b) => b.rating - a.rating);
            }

            return {
                ...state,
                restaurants: sortedRestaurantsRating,
            };
        case ORDER_BY_PRICE:
            const sortedProductsByPrice = [...state.products];
            if (payload === 'low') {
                sortedProductsByPrice.sort((a, b) => a.price - b.price);
            } else if (payload === 'high') {
                sortedProductsByPrice.sort((a, b) => b.price - a.price);
            }
            return {
                ...state,
                products: sortedProductsByPrice
            };

        case ORDER_BY_RATING_PRODUCTS:
            let sortedProductsByRating = [...state.products];
            if (payload === 'low') {
                sortedProductsByRating.sort((a, b) => a.rating - b.rating);
            } else if (payload === 'high') {
                sortedProductsByRating.sort((a, b) => b.rating - a.rating);
            }
            console.log('Sorted Products By Rating:', sortedProductsByRating);
            return {
                ...state,
                filteredProducts: sortedProductsByRating,
            };

        case FILTER_BY_RATING:
            const ratingFilter = payload;  // Accede al payload directamente
            const filteredRestaurants = ratingFilter
                ? state.restaurants.filter(restaurant => restaurant.rating > ratingFilter)
                : state.restaurants;
            return {
                ...state,
                restaurants: filteredRestaurants,
            };

        case OPEN_PRODUCT_DETAILS:
            console.log(payload)
            const product = state.products.find(product => payload == product._id);
            return {
                ...state,
                modalProductDetails: true,
                product: product,
            }

        case CLOSE_PRODUCT_DETAILS:
            return {
                ...state,
                modalProductDetails: false,
            }

        case OPEN_CART:
            return {
                ...state,
                modalCart: true,
            }

        case CLOSE_CART:
            return {
                ...state,
                modalCart: false,
            }

        case ADD_CART_ITEM:
            cartDetails = JSON.parse(localStorage.getItem('cartDetails'));

            if (Object.keys(cartDetails).length > 0) {

                itemsCount = cartDetails.itemsCount + 1;
                cartDetails.itemsCount = itemsCount;

                foundItem = cartDetails.items.find((product) => product._id === payload._id);

                if (Object.keys(cartDetails.store).length === 0) cartDetails.store = state.restaurantSelected;

                if (foundItem) {
                    quantity = foundItem.quantity + 1;
                    foundItem.quantity = quantity;
                    cartDetails.subtotal = cartDetails.subtotal + foundItem.price;
                    cartDetails.total = cartDetails.subtotal + state.shippingFee;
                }
                else {
                    cartDetails.items = [...cartDetails.items, {
                        _id: payload._id,
                        name: payload.name,
                        price: payload.price,
                        image: payload.image,
                        quantity: 1,
                    }]
                    cartDetails.subtotal = cartDetails.subtotal + payload.price;
                    cartDetails.total = cartDetails.subtotal + state.shippingFee;
                }
            }
            else {
                cartDetails = {
                    store: state.restaurantSelected,
                    items: [{
                        _id: payload._id,
                        name: payload.name,
                        price: payload.price,
                        image: payload.image,
                        quantity: 1,
                    }],
                    itemsCount: 1,
                    subtotal: payload.price,
                    total: payload.price + state.shippingFee
                }
            }

            localStorage.setItem('cartDetails', JSON.stringify(cartDetails));

            return {
                ...state,
                cartDetails: cartDetails
            }

        case REMOVE_CART_ITEM:
            cartDetails = JSON.parse(localStorage.getItem('cartDetails'));
            itemsCount = cartDetails.itemsCount - 1;
            cartDetails.itemsCount = itemsCount;

            foundItem = cartDetails.items.find((product) => product._id === payload._id);

            if (foundItem) {
                quantity = foundItem.quantity - 1;
                foundItem.quantity = quantity;
                cartDetails.subtotal = cartDetails.subtotal - foundItem.price;
                cartDetails.total = cartDetails.subtotal + state.shippingFee;
            }

            localStorage.setItem('cartDetails', JSON.stringify(cartDetails));

            return {
                ...state,
                cartDetails: cartDetails
            }

        case DELETE_CART_ITEM:
            cartDetails = JSON.parse(localStorage.getItem('cartDetails'));

            foundItem = cartDetails.items.find((product) => product._id === payload._id);
            index = cartDetails.items.findIndex((product) => product._id === payload._id);
            if (foundItem) {
                itemsCount = cartDetails.itemsCount - 1;
                cartDetails.itemsCount = itemsCount;
                cartDetails.subtotal = cartDetails.subtotal - foundItem.price;
                cartDetails.total = cartDetails.subtotal + state.shippingFee;
                cartDetails.items.splice(index, 1);

            }
            localStorage.setItem('cartDetails', JSON.stringify(cartDetails));
            return {
                ...state,
                cartDetails: {
                    ...state.cartDetails,
                    itemsCount: itemsCount,
                    items: cartDetails.items,
                    subtotal: cartDetails.subtotal,
                    total: cartDetails.total
                }
            }

        case CLEAR_CART:
            cartDetails = {
                store: {},
                items: [],
                itemsCount: 0,
                subtotal: 0,
                total: 0,
            }
            localStorage.setItem('cartDetails', JSON.stringify({}));
            localStorage.setItem('emailKeys', JSON.stringify({}));

            return {
                ...state,
                cartDetails: cartDetails,
                restaurantSelected: {}
            }

        case SET_RESTAURANT:
            localStorage.setItem('restaurantSelected', JSON.stringify(payload));
            return {
                ...state,
                restaurantSelected: payload
            }

        case CREATE_CHECKOUT:
            localStorage.setItem('paymentData', JSON.stringify(payload));

            return {
                ...state,
                paymentUrl: payload.url,

            }

        case GET_EMAIL_KEYS:
            localStorage.setItem('emailKeys', JSON.stringify(payload));
            return {
                ...state,
                emailKeys: payload

            }

        case SET_SEARCH:
            const searchState = payload.searchState;
            const data = payload.data;
            const searchBy = payload.searchBy;

            if (searchState && searchBy === 'pizza') {
                return {
                    ...state,
                    search: true,
                    products: data,
                    searchBy: searchBy
                }
            }
            if (searchState && searchBy === 'restaurante') {
                return {
                    ...state,
                    search: true,
                    restaurants: data,
                    searchBy: searchBy
                }
            }

            if (!searchState)
                return {
                    ...state,
                    search: false,
                    restaurants: data,
                }

        default:
            return { ...state };
    }
}

export default rootReducer;

