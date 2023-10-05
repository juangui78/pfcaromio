import {
    GET_PRODUCTS,
    GET_RESTAURANTS,
    OPEN_PRODUCT_DETAILS,
    CLOSE_PRODUCT_DETAILS,
    OPEN_CART,
    CLOSE_CART,
    ADD_CART_ITEM,

} from './actionsTypes';

const initialState = {
    products: [],
    product: {},
    modalProductDetails: false,
    modalCart: false,
    restaurants: [], //stores

    cartReducer:{
        itemsCount:0,
        subtotal:0,
        total:0,
    }
};

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

        case OPEN_PRODUCT_DETAILS:
            const product = state.products.find(product => payload === product.id);

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
            return {
                ...state,
            }

        default:
            return { ...state };
    }
}

export default rootReducer;

