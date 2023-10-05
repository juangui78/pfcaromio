//importamos el modelo directamente 
const  {Products}  = require('../models/product');
const mongoose = require('mongoose');
// Obtener todos los productos
const getAllProducts = async () => {
    try {
        console.log("Ejecuta el controlador")
        console.log(Products);
        const products = await Products.find();
        return products;
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
const getProductsByFilter = async (minRating, maxPrice) => {
    try {
        let filter = {};

        if (minRating) {
            filter.rating = { $gte: parseFloat(minRating) };
        }

        if (maxPrice) {
            filter.price = { $lte: parseFloat(maxPrice) };
        }

        const products = await Products.find(filter);

        return products;
    } catch (err) {
        console.log(err);
    }
};

// Crear un nuevo producto
const createProduct = async (name, price, rating, description,image, stock) => {
    try {
        const newProduct = new Product({
            name: name,
            price: price,
            rating: rating,
            description: description,
            image: image,
            stock: stock,
            // store: storeId,
        });
        console.log(newProduct);
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
