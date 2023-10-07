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
        if (order && (order.toLowerCase() === 'asc' || order.toLowerCase() === 'desc')) {
            let sortOrder = order.toLowerCase() === 'desc' ? -1 : 1;
            const stores = await Store.find()
                .sort({ name: sortOrder });

            return stores;
        } else {
            return await Store.find();
        }
    } catch (err) {
        console.log(err);
    }
};

// Obtener todas las tiendas ordenadas por calificación
const getStoresSortedByRating = async (order) => {
    try {
        if (order && (order.toLowerCase() === 'asc' || order.toLowerCase() === 'desc')) {
            let sortOrder = order.toLowerCase() === 'desc' ? -1 : 1;
            const stores = await Store.find()
                .sort({ rating: sortOrder });

            return stores;
        } else {
            return await Store.find();
        }
    } catch (err) {
        console.log(err);
    }
};
// Obtener una tienda por su ID o por su nombre
const getStoreByIdOrName = async (identifier) => {
    console.log(identifier.toLowerCase().replace(/\s/g, ''));
    try {
        let store;
        if (mongoose.isValidObjectId(identifier)) {
            store = await Store.findById(identifier)
               // .populate('reviews')
               .populate('products');
        } else {
            store = await Store.findOne({ name: identifier.toLowerCase().replace(/\s/g, '') })
               // .populate('reviews')
               .populate('products');
        }
        return store;
       
    } catch (err) {
        console.log(err);
    }
};

//Obtener tiendas filtradas por calificación
const getStoresByFilter = async (minRating) => {
    try {
        let filter = {};

        if (minRating) {
            filter.rating = { $gte: parseFloat(minRating) };
        }

        const stores = await Store.find(filter);

        return stores;
    } catch (err) {
        console.log(err);
    }
};

// Crear una nueva tienda
const createStore = async (name, address, rating, revenue, image, description, products) => {
    try {
        const newStore = new Store({
            // userID: userID,
            name: name.toLowerCase().replace(/\s/g, ''),
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