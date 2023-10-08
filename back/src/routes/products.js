const express = require('express');
const router = express.Router();
const { 
    getAllProducts, 
    getProductsSortedByPrice, 
    getProductsSortedByRating, 
    getProductsByIdOrName, 
    getProductsByFilter, 
    createProduct,
    getProductsByStore
} = require('../controllers/products');

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
    const storeid = req.query.storeid;

    try {
        const products = await getAllProducts(storeid);
        console.log("Intenta traerlos")
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
});

// Ruta para obtener todos los productos ordenados por precio según el parámetro de consulta "order"
router.get('/by-price', async (req, res) => {
    const order = req.query.order;
    const storeid = req.query.storeid;

    try {
        const products = await getProductsSortedByPrice(order, storeid);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching and sorting products by price' });
    }
});

// Ruta para obtener todos los productos ordenados por calificación según el parámetro de consulta "order"
router.get('/by-rating', async (req, res) => {
    const order = req.query.order;
    const storeid = req.query.storeid;

    try {
        const products = await getProductsSortedByRating(order, storeid);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching and sorting products by rating' });
    }
});

// Ruta para obtener productos filtrados
router.get('/filtered', async (req, res) => {
    const minRating = req.query.minRating;
    const maxPrice = req.query.maxPrice;
    const storeid = req.query.storeid;

    try {
        const filteredProducts = await getProductsByFilter(minRating, maxPrice, storeid);
        res.json(filteredProducts);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching filtered products' });
    }
});

// // Ruta para obtener productos por su ID o por su nombre
// router.get('/:productIdOrName', async (req, res) => {
//     const productIdOrName = req.params.productIdOrName;
//     const storeid = req.query.storeid;

//     try {
//         const products = await getProductsByIdOrName(productIdOrName, storeid);
//         if (!products || products.length === 0) {
//             res.status(404).json({ error: 'Products not found' });
//         } else {
//             res.status(200).json(products);
//         }
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching products' });
//     }
// });

// Ruta para crear un nuevo producto
router.post('/', async (req, res) => {
    const { name, price, rating, description,image, stock, storeId } = req.body;

    try {
        const newProduct = await createProduct( name, price, rating, description,image, stock, storeId);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error creating the product' });
    }
});

// Ruta para obtener productos por restaurante
router.get('/:storeId', async (req, res) => {
    
    const storeId = req.params.storeId;
    console.log('entro +', storeId);

    try {
        const products = await getProductsByStore(storeId);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products by store' });
    }
    
})

module.exports = router;
