const express = require('express');
const router = express.Router();
const { 
    getStores, 
    getStoresSortedByName, 
    getStoresSortedByRating, 
    getStoreByIdOrName,
    getStoresByFilter,
    createStore,
    getStoreByName, 
    getStoreByUser,
    getStoreById,
    toggleEnabled,
    getStoresEnabled
    } = require('../controllers/store');

// Ruta para obtener todas las tiendas
router.get('/', async (req, res) => {
    try {
        const stores = await getStores();
        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching stores' });
    }
});

router.get('/enabled', async (req, res) => {
    try {
        const stores = await getStoresEnabled();
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
        res.status(500).json({ error: 'Error fetching and sorting stores by name', details: error.message });
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

// Ruta para obtener tiendas filtradas por calificación
router.get('/filtered', async (req, res) => {
    try {
        const minRating = req.query.minRating;
        const filteredStores = await getStoresByFilter(minRating);
        res.json(filteredStores);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching filtered stores' });
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

router.get('/getstore/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const store = await getStoreByUser(id);
        if (!store) {
            res.status(404).json({ error: 'Store not found' });
        } else {
            res.status(200).json(store);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching store' });
    }
});

router.get('/getstore-id/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const store = await getStoreById(id);
        if (!store) {
            res.status(404).json({ error: 'Store not found' });
        } else {
            res.status(200).json(store);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching store' });
    }
});

router.get('/search/:storeName', async (req, res) => {
    const storeName = req.params.storeName;

    try {
        const store = await getStoreByName(storeName);
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
    const { userIdentifier, name, address, rating, revenue, image, products, description } = req.body;
   
    console.log(req.body);
    try {
        const newStore = await createStore(userIdentifier, name, address, rating, revenue, image, products, description);
        res.status(201).json(newStore);
        console.log('problema aqui en el post');
        
    } catch (error) {
        res.status(500).json({ error: 'Error creating the store' });
    }
});

// Ruta para alternar el estado "enabled" de una tienda
router.put('/toggle/:storeId', async (req, res) => {
    const storeId = req.params.storeId;

    try {
        const store = await toggleEnabled(storeId);

        if (!store) {
            return res.status(404).json({ error: 'Tienda no encontrada' });
        }

        res.status(200).json(store);
    } catch (error) {
        res.status(500).json({ error: 'Error al cambiar el estado "enabled" de la tienda' });
    }
});

module.exports = router;