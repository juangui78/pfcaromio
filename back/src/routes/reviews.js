const express = require('express');
const router = express.Router();
const { createReview } = require('../controllers/reviews');

// Ruta para crear una nueva review
router.post('/', async (req, res) => {
    const { description, rating, categories, userId, storeId, productId } = req.body;

    try {
        const newReview = await createReview(description, rating, categories, userId, storeId, productId);
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ error: 'Error creating the review' });
    }
});

module.exports = router;
