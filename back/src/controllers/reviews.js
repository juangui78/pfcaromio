const { Reviews } = require('../db');

// Crear una nueva review
const createReview = async (description, rating, categories, userId, storeId, productId) => {
    try {
        const newReview = new Reviews({
            description: description,
            rating: rating,
            categories: categories,
            user: userId,
            store: storeId,
            product: productId,
        });

        await newReview.save();

        return newReview;
    } catch (err) {
        console.log(err);
    }
};

module.exports = { createReview };
