const { Products } = require('../db');

// Obtener todos los productos
const getAllProducts = async () => {
    try {
        return await Products.find();
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

// Crear un nuevo producto
const createProduct = async (name, storeId, price, stock, rating) => {
    try {
        const newProduct = new Products({
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
    createProduct
};
