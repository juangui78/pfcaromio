const express = require('express');
const router = express.Router();
const { 
    getAllProducts, 
    getProductsSortedByPrice, 
    getProductsSortedByRating, 
    getProductsByIdOrName, 
    getProductsByFilter, 
    createProduct 
} = require('../controllers/products');

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const products = await getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
});

// Ruta para obtener todos los productos ordenados por precio según el parámetro de consulta "order"
router.get('/by-price', async (req, res) => {
    const order = req.query.order;

    try {
        const products = await getProductsSortedByPrice(order);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching and sorting products by price' });
    }
});

// Ruta para obtener todos los productos ordenados por calificación según el parámetro de consulta "order"
router.get('/by-rating', async (req, res) => {
    const order = req.query.order;

    try {
        const products = await getProductsSortedByRating(order);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching and sorting products by rating' });
    }
});

// Ruta para obtener productos por su ID o por su nombre
router.get('/:productIdOrName', async (req, res) => {
    const productIdOrName = req.params.productIdOrName;
    try {
        const products = await getProductsByIdOrName(productIdOrName);
        if (!products || products.length === 0) {
            res.status(404).json({ error: 'Products not found' });
        } else {
            res.status(200).json(products);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
});

// Ruta para obtener productos filtrados
router.get('/', async (req, res) => {
    try {
        const minRating = req.query.minRating;
        const priceLevel = req.query.priceLevel;
        const filteredProducts = await getProductsByFilter(minRating, priceLevel);
        res.json(filteredProducts);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching filtered products' });
    }
});

// Ruta para crear un nuevo producto
router.post('/', async (req, res) => {
    const { name, price, rating, description,image, stock, storeId} = req.body;

    try {
        const newProduct = await createProduct(name, price, rating, description,image, stock, storeId);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error creating the product' });
    }
});

module.exports = router;
