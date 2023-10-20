//importamos el modelo directamente 
const { Store } = require('../models/store');
const mongoose = require('mongoose');
// Obtener todas las tiendas de la base de datos
const getStores = async () => {
    try {
        return await Store.find();
    } catch (err) {
        console.log(err);
    }
};

//Otener todas las tiendas ordenadas por nombre
const getStoresSortedByName = async (order) => {
    try {
        const sortOrder = order && (order.toLowerCase() === 'asc') ? 1 : -1;
        const stores = await Store.find().sort({ name: sortOrder });
 
        return stores;
    } catch (err) {
        console.log(err);
    }
};

// Obtener todas las tiendas ordenadas por calificación
const getStoresSortedByRating = async (order) => {
    try {
        const sortOrder = order && (order.toLowerCase() === 'asc') ? 1 : -1;
        const stores = await Store.find().sort({ rating: sortOrder });

        return stores;
    } catch (err) {
        console.log(err);
    }
};

// Obtener una tienda por su ID o por su nombre
const getStoreByIdOrName = async (identifier) => {
    try {
        const storeQuery = mongoose.isValidObjectId(identifier)
            ? { _id: identifier }
            : { name: { $regex: new RegExp(identifier, 'i') } };
            
        const store = await Store.findOne(storeQuery)
            // .populate('reviews')
            .populate('products');
        
        return store;
    } catch (err) {
        console.log(err);
    }
};


//Obtener tiendas filtradas por calificación
const getStoresByFilter = async (minRating) => {
    try {
        const filter = minRating ? { rating: { $gte: parseFloat(minRating) } } : {};
        const stores = await Store.find(filter);

        return stores;
    } catch (err) {
        console.log(err);
    }
};


// Crear una nueva tienda

const createStore = async (userIdentifier, name, address, rating, revenue, image, products, description) => {
    // console.log(req.files);
    
    try {
        const newStore = new Store({
            userIdentifier: userIdentifier,
            name: name,
            address: address,
            rating: rating,
            revenue: revenue,
            image: image,
            description: description,
            products: products,
        });

        await newStore.save();
        return newStore;

    } catch (err) {
        console.log('error en controlador');
        console.log(err);
    }
};

module.exports = {
    getStores,
    getStoresSortedByName,
    getStoresSortedByRating,
    getStoreByIdOrName,
    getStoresByFilter,
    createStore
};