import {
   GET_PRODUCTS,
   OPEN_PRODUCT_DETAILS,
   CLOSE_PRODUCT_DETAILS,
   
} from './actionsTypes';

const initialState = {
    products: [],
    product: {},
    modalProductDetails: false,
};

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: payload,
            }
        case OPEN_PRODUCT_DETAILS:
            const product= state.products.find(product=>payload===product.id);
   
            return {
                ...state,
                modalProductDetails: true,
                product:product,
            }
        case CLOSE_PRODUCT_DETAILS:
            return {
                ...state,
                modalProductDetails: false,
            }

        default:
            return { ...state };
    }
}

export default rootReducer;

