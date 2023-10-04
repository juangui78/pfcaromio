//importamos el modelo directamente 
const  {Store}  = require('../modules/store');

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

//Obtener tiendas filtradas por calificación y precio
const getStoresByFilter = async (minRating, priceLevel) => {
    try {
        let filter = {};

        if (minRating) {
            filter.rating = { $gte: parseFloat(minRating) };
        }

        if (priceLevel) {
            if (priceLevel === 'high') {
                filter.averagePrice = { $gt: 50 }; // Ejemplo: Precio alto si es mayor que 50 (ajustar)
            } else if (priceLevel === 'mid') {
                filter.averagePrice = { $gte: 20, $lte: 50 }; // Ejemplo: Precio medio entre 20 y 50 (ajustar)
            } else if (priceLevel === 'low') {
                filter.averagePrice = { $lt: 20 }; // Ejemplo: Precio bajo si es menor que 20 (ajustar)
            }
        }

        const stores = await Store.find(filter);

        return stores;
    } catch (err) {
        console.log(err);
    }
};

// Crear una nueva tienda
const createStore = async (userID, name, address, rating, revenue, image, products) => {
    try {
        const newStore = new Store({
            userID: userID,
            name: name,
            address: address,
            rating: rating,
            revenue: revenue,
            image: image,
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