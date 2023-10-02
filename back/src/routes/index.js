const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
const storesRouter = require('./store');
const productsRouter = require('./products');
const reviewsRouter = require('./reviews');

// Rutas principales para los diferentes recursos
router.use('/users', usersRouter);
router.use('/stores', storesRouter);
router.use('/products', productsRouter);
router.use('/reviews', reviewsRouter);

module.exports = router;
