import {
    GET_PRODUCTS,
    GET_RESTAURANTS,
    OPEN_PRODUCT_DETAILS,
    CLOSE_PRODUCT_DETAILS,
    OPEN_CART,
    CLOSE_CART,
    ADD_CART_ITEM,
    REMOVE_CART_ITEM,
    DELETE_CART_ITEM,

} from './actionsTypes';

const initialState = {
    products: [],
    product: {},
    modalProductDetails: false,
    modalCart: false,
    restaurants: [], // * stores

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
            }

            return {
                ...state,
                cartDetails: { 
                    ...state.cartDetails, 
                    itemsCount: itemsCount, 
                    items: cartDetails.items, 
                    subtotal:cartDetails.subtotal 
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
            }

            return {
                ...state,
                cartDetails: { 
                    ...state.cartDetails, 
                    itemsCount: itemsCount, 
                    items: cartDetails.items,
                    subtotal:cartDetails.subtotal 
                }
            }

        case DELETE_CART_ITEM:
            cartDetails = { ...state.cartDetails };
            
            foundItem = cartDetails.items.find((product) => product._id === payload._id);
            const index = cartDetails.items.findIndex((product) => product._id ===  payload._id);
            if (foundItem) {
                itemsCount = cartDetails.itemsCount - 1;
                /* quantity = foundItem.quantity - 1;
                foundItem.quantity = quantity; */
                cartDetails.subtotal = cartDetails.subtotal - foundItem.price;
                cartDetails.items.splice(index, 1); 
                
            }

            return {
                ...state,
                cartDetails: { 
                    ...state.cartDetails, 
                    itemsCount: itemsCount, 
                    items: cartDetails.items,
                    subtotal:cartDetails.subtotal 
                }
            }

        default:
            return { ...state };
    }
}

export default rootReducer;

