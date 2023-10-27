const express = require('express');
const router = express.Router();
const { createReview } = require('../controllers/reviews');

// Ruta para crear una nueva review
router.post('/', async (req, res) => {
    const { description, rating, userId, storeId } = req.body;

    try {
        const newReview = await createReview(description, rating, userId, storeId);
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ error: 'Error creating the review' });
    }
});

module.exports = router;
