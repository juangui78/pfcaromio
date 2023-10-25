//importamos el modelo directamente 
const { Store } = require('../models/store');
const mongoose = require('mongoose');
// Obtener todas las tiendas de la base de datos
const getStores = async () => {
    try {
        // await Store.updateMany({}, { $set: { enabled: true } }); // codigo para actualizar todos los productos a true.
        return await Store.find();
    } catch (err) {
        console.log(err);
    }
};

//Otener todas las tiendas ordenadas por nombre
const getStoresSortedByName = async (order) => {
    try {
        const sortOrder = order && (order.toLowerCase() === 'asc') ? 1 : -1;
        const stores = await Store.find({ enabled: true }).sort({ name: sortOrder });

        return stores;
    } catch (err) {
        console.log(err);
    }
};

// Obtener todas las tiendas ordenadas por calificación
const getStoresSortedByRating = async (order) => {
    try {
        const sortOrder = order && (order.toLowerCase() === 'asc') ? 1 : -1;
        const stores = await Store.find({ enabled: true }).sort({ rating: sortOrder });

        return stores;
    } catch (err) {
        console.log(err);
    }
};

// Obtener una tienda por su ID o por su nombre
const getStoreByIdOrName = async (name) => {
    try {

        const store = await Store.findOne({
            $and: [
                { $or: [
                    { name: { $regex: new RegExp(name, 'i') } },
                    { userIdentifier: name },
                ]},
                { enabled: true }
            ]
        }).populate('products');

        return store;
    } catch (err) {
        console.log(err);
        throw new Error('Error al buscar la tienda por nombre.');
    }
};

const getStoreByUser = async (id) => {
    try {

        const store = await Store.findOne({userIdentifier: id , enabled: true }).populate('products');

        return store;
    } catch (err) {
        console.log(err);
        throw new Error('Error al buscar la tienda por userIdentifier.');
    }
};

const getStoreById = async (id) => {
    try {
        const store = await Store.findOne({_id: id, enabled: true }).populate('products');
        return store;
    } catch (err) {
        console.log(err);
        throw new Error('Error al buscar la tienda por userIdentifier.');
    }
};


const getStoreByName = async (name) => {
    try {
       const nameRegex = new RegExp(name, 'i');
        const stores = await Store.find({
            name: {$regex: nameRegex},
            enabled: true 
        });
        return stores;

    } catch (err) {
        console.log(err);
        throw new Error('Error al buscar la tienda por nombre.');
    }
};


//Obtener tiendas filtradas por calificación
const getStoresByFilter = async (minRating) => {
    try {
        const filter = minRating ? { rating: { $gte: parseFloat(minRating) }, enabled: true } : {enabled: true};
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

const toggleEnabled = async (StoreId) => {
    try {
        const store = await Store.findById(StoreId);
        
        if (!store) {
            console.log("tienda no encontrada");
            return;
        }

        store.enabled = !store.enabled;

        await store.save();

        console.log(`'enabled' para la Store ${StoreId} ha sido cambiado a ${store.enabled}`);
        return store
    } catch (error) {
        console.error('Error al cambiar el estado de "enabled":', error);
    }
};

module.exports = {
    getStores,
    getStoresSortedByName,
    getStoresSortedByRating,
    getStoreByIdOrName,
    getStoresByFilter,
    createStore,
    getStoreByName, 
    getStoreByUser,
    getStoreById,
    toggleEnabled
};