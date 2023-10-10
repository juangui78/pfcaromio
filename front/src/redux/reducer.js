import axios from 'axios';

import {
    GET_PRODUCTS,
    GET_RESTAURANTS,
    GET_RESTAURANT,
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

} from './actionsTypes';

const initialState = {
    filteredProducts: [], // Lista filtrada de productos
    filteredRestaurants: [], // Lista filtrada de restaurantes
    filterByRating: null,
    products: [],
    product: {},
    modalProductDetails: false,
    modalCart: false,
    restaurants: [], // * stores
    restaurantSelected: {},
    paymentUrl: null,
    shippingFee: 2,

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
            const product = state.products.find(product => payload === product._id);
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
            cartDetails = { ...state.cartDetails };
            itemsCount = cartDetails.itemsCount + 1;
           
            foundItem = cartDetails.items.find((product) => product._id === payload._id);

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

            return {
                ...state,
                cartDetails: {
                    ...state.cartDetails,
                    itemsCount: itemsCount,
                    items: cartDetails.items,
                    subtotal: cartDetails.subtotal,
                    total: cartDetails.total,
                }
            }

        case REMOVE_CART_ITEM:
            cartDetails = { ...state.cartDetails };
            itemsCount = cartDetails.itemsCount - 1;

            foundItem = cartDetails.items.find((product) => product._id === payload._id);

            if (foundItem) {
                quantity = foundItem.quantity - 1;
                foundItem.quantity = quantity;
                cartDetails.subtotal = cartDetails.subtotal - foundItem.price;
                cartDetails.total = cartDetails.subtotal + state.shippingFee;
            }

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

        case DELETE_CART_ITEM:
            cartDetails = { ...state.cartDetails };

            foundItem = cartDetails.items.find((product) => product._id === payload._id);
            index = cartDetails.items.findIndex((product) => product._id === payload._id);
            if (foundItem) {
                itemsCount = cartDetails.itemsCount - 1;
                /* quantity = foundItem.quantity - 1;
                foundItem.quantity = quantity; */
                cartDetails.subtotal = cartDetails.subtotal - foundItem.price;
                cartDetails.total = cartDetails.subtotal + state.shippingFee;
                cartDetails.items.splice(index, 1);

            }

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

            return {
                ...state,
                cartDetails: cartDetails,
                restaurantSelected: {}
            }

        case SET_RESTAURANT:
            return {
                ...state,
                restaurantSelected: payload
            }

        case CREATE_CHECKOUT:            
            return {
                ...state,
                paymentUrl: payload

            }

        default:
            return { ...state };
    }
}

export default rootReducer;

