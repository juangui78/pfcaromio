const { Store } = require('../db');

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
    try {
        let store;
        if (mongoose.Types.ObjectId.isValid(identifier)) {
            store = await Store.findById(identifier)
                .populate('reviews')
                .populate('products');
        } else {
            store = await Store.findOne({ name: identifier })
                .populate('reviews')
                .populate('products');
        }
        return store;
    } catch (err) {
        console.log(err);
    }
};

// Crear una nueva tienda
const createStore = async (name, products, solds, revenue, rating) => {
    try {
        const newStore = new Store({
            name: name,
            products: products,
            solds: solds,
            revenue: revenue,
            rating: rating,
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
    createStore
};