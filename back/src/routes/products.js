const express = require('express');
const router = express.Router();
const { 
    getAllProducts, 
    getProductsSortedByPrice, 
    getProductsSortedByRating, 
    getProductsByIdOrName, 
    getProductsByFilter, 
    createProduct,
    updateProduct
} = require('../controllers/products');

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
    const storeId = req.query.storeid;

    try {
        console.log("Intenta traerlos")
        const products = await getAllProducts(storeId);

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
    const storeId = req.query.storeid;

    try {
        const filteredProducts = await getProductsByFilter(minRating, maxPrice, storeId);
        res.json(filteredProducts);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching filtered products' });
    }
});

//Ruta para obtener productos por su ID o por su nombre

router.get('/:productIdOrName', async (req, res) => {
    const productIdOrName = req.params.productIdOrName;
    const storeId = req.query.storeid;

    try {
        const products = await getProductsByIdOrName(productIdOrName, storeId);
        if (!products || products.length === 0) {
            res.status(404).json({ error: 'Products not found' });
        } else {
            res.status(200).json(products);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
});


// Ruta para crear un nuevo producto
router.post('/', async (req, res) => {
    const { UserStoreId, name, price, rating, description,image, stock} = req.body;
    
    try {
        const newProduct = await createProduct(UserStoreId, name, price, rating, description,image, stock);
        res.status(201).json(newProduct);
        console.log("Se creó exitosamente");
    } catch (error) {
        res.status(500).json({ error: 'Error creating the product' });
    }
});

// Ruta para editar un producto por su ID
router.put('/:productId', async (req, res) => {
  const productId = req.params.productId;
  const { name, price, rating, description, image, stock } = req.body;

  try {
    const updatedProduct = await updateProduct(productId, name, price, rating, description, image, stock);

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al editar el producto' });
  }
});

module.exports = router;



module.exports = router;
