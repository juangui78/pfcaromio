const {User} = require('../models/user');
const {Store} = require('../models/store');
const {Products} = require('../models/product');
const {Review} = require('../models/review');


// Crear una nueva product review
const createProductsReview = async (userIdentifier, productId, rating, comment) => {
    try {
        const newReview = new Review({
            user: userIdentifier,
            rating,
            comment,
        });

        await newReview.save();

        const product = await Products.findById(productId);
        product.reviews.push(newReview);

        const totalRatings = product.reviews.reduce((total, review) => total + review.rating, 0);
        product.rating = totalRatings / product.reviews.length;

        await product.save();

        const user = await User.findOne({userIdentifier})
        user.reviews.push(newReview);
        await user.save();

        return newReview;
    } catch (error) {
        console.error(error);
        throw new Error('Error al agregar la reseña');
    }
};

const createStoreReview = async (userIdentifier, StoreId, rating, comment) => {
    try {
        const newReview = new Review({
            user: userIdentifier,
            rating,
            comment,
        });

        await newReview.save();

        const store = await Store.findById(StoreId);
        store.reviews.push(newReview);

        const totalRatings = store.reviews.reduce((total, review) => total + review.rating, 0);
        store.rating = totalRatings / store.reviews.length;

        await store.save();

        const user = await User.findOne({userIdentifier})
        user.reviews.push(newReview);
        await user.save();

        return newReview;
    } catch (error) {
        console.error(error);
        throw new Error('Error al agregar la reseña');
    }
};

module.exports = { 
    createProductsReview,
    createStoreReview 
};
