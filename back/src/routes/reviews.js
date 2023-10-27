const express = require('express');
const router = express.Router();
const { 
    createProductsReview,
    createStoreReview 
} = require('../controllers/reviews');

// Ruta para crear una nueva review de un producto
router.post('/product', async (req, res) => {
    const { userIdentifier, productId, rating, comment } = req.body;
    console.log("entra en la ruta")
    console.log(userIdentifier)
    try {
        const newReview = await createProductsReview(userIdentifier, productId, rating, comment);
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ error: 'Error creating the review' });
    }
});

// Ruta para crear una nueva review de una tienda
router.post('/store', async (req, res) => {
    const { userIdentifier, StoreId, rating, comment } = req.body;
    //console.log("Entro a la ruta");
    //console.log(userIdentifier);
    try {
        const newReview = await createStoreReview(userIdentifier, StoreId, rating, comment);
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ error: 'Error creating the review' });
    }
});

module.exports = router;
