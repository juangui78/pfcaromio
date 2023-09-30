const express = require('express');
const router = express.Router();
const { getStores, getStoresSortedByName, getStoresSortedByRating, getStoreByIdOrName, createStore } = require('../controllers/store');

// Ruta para obtener todas las tiendas
router.get('/', async (req, res) => {
    try {
        const stores = await getStores();
        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching stores' });
    }
});

// Ruta para obtener todas las tiendas ordenadas por nombre según el parámetro de consulta "order"
router.get('/by-name', async (req, res) => {
    const order = req.query.order;

    try {
        const stores = await getStoresSortedByName(order);
        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching and sorting stores by name' });
    }
});

// Ruta para obtener todas las tiendas ordenadas por calificacion según el parámetro de consulta "order"
router.get('/by-rating', async (req, res) => {
    const order = req.query.order;

    try {
        const stores = await getStoresSortedByRating(order);
        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching and sorting stores by rating' });
    }
});

// Ruta para obtener una tienda por su ID o por su nombre
router.get('/:storeIdOrName', async (req, res) => {
    const storeIdOrName = req.params.storeIdOrName;

    try {
        const store = await getStoreByIdOrName(storeIdOrName);
        if (!store) {
            res.status(404).json({ error: 'Store not found' });
        } else {
            res.status(200).json(store);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching store' });
    }
});

// Ruta para crear una nueva tienda
router.post('/', async (req, res) => {
    const { name, products, solds, revenue, rating } = req.body;

    try {
        const newStore = await createStore(name, products, solds, revenue, rating);
        res.status(201).json(newStore);
    } catch (error) {
        res.status(500).json({ error: 'Error creating the store' });
    }
});

module.exports = router;