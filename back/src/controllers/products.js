//const { Products } = require('../db');
const Product = require('../models/product');
const { products } = require('../data'); // ! Data provisional para pruebas

// Obtener todos los productos
const getAllProducts = async () => {
    try {
        return await Product.find();
    } catch (err) {
        console.log(err);
    }
};

// Obtener todos los productos ordenados por su precio
const getProductsSortedByPrice = async (order) => {
    try {
        if (order && (order.toLowerCase() === 'asc' || order.toLowerCase() === 'desc')) {
            let sortOrder = order.toLowerCase() === 'desc' ? -1 : 1;
            const ProductsList = await Products.find()
                .sort({ price: sortOrder });

            return ProductsList;
        } else {
            return await Products.find();
        }
    } catch (err) {
        console.log(err);
    }
};

// Obtener todos los productos ordenados por su calificación
const getProductsSortedByRating = async (order) => {
    try {
        if (order && (order.toLowerCase() === 'asc' || order.toLowerCase() === 'desc')) {
            let sortOrder = order.toLowerCase() === 'desc' ? -1 : 1;
            const ProductsList = await Products.find()
                .sort({ rating: sortOrder });

            return ProductsList;
        } else {
            return await Products.find();
        }
    } catch (err) {
        console.log(err);
    }
};


// Obtener productos por su ID o nombre
const getProductsByIdOrName = async (identifier) => {
    try {
        let products;
        if (mongoose.Types.ObjectId.isValid(identifier)) {
            products = await Products.findById(identifier)
                .populate('store')
                .populate('reviews');
        } else {
            products = await Products.find({ name: identifier })
                .populate('store')
                .populate('reviews');
        }
        return products;
    } catch (err) {
        console.log(err);
    }
};

//Obtener productos filtrados por calificación y precio
const getProductsByFilter = async (minRating, priceLevel) => {
    try {
        let filter = {};

        if (minRating) {
            filter.rating = { $gte: parseFloat(minRating) };
        }

        if (priceLevel) {
            if (priceLevel === 'high') {
                filter.price = { $gt: 50 }; // Ejemplo: Precio alto si es mayor que 50 (ajustar)
            } else if (priceLevel === 'mid') {
                filter.price = { $gte: 20, $lte: 50 }; // Ejemplo: Precio medio entre 20 y 50 (ajustar)
            } else if (priceLevel === 'low') {
                filter.price = { $lt: 20 }; // Ejemplo: Precio bajo si es menor que 20 (ajustar)
            }
        }

        const products = await Products.find(filter);

        return products;
    } catch (err) {
        console.log(err);
    }
};

// Crear un nuevo producto
const createProduct = async (name, storeId, price, stock, rating, storeID) => {
    try {
        const newProduct = new Product({
            name: name,
            store: storeId,
            price: price,
            stock: stock,
            rating: rating,
        });

        await newProduct.save();
        return newProduct;
        
    } catch (err) {
        console.log(err);
    }
};

module.exports = { 
    getAllProducts,
    getProductsSortedByPrice,
    getProductsSortedByRating,
    getProductsByIdOrName,
    getProductsByFilter,
    createProduct
};
