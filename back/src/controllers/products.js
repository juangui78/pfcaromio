const  {Products}  = require('../models/product');
const { Store } = require('../models/store');
const mongoose = require('mongoose');

//Obtener todos los productos
const getAllProducts = async (storeId) => {
    try {
        return storeId ? await Products.find({ store: storeId }).exec() : await Products.find();
    } catch (err) {
        console.log(err);
    }
};

// Obtener todos los productos ordenados por su precio
const getProductsSortedByPrice = async (order, storeid) => {
    try {
        const sortOrder = order && order.toLowerCase() === 'asc' ? 1 : -1;
        const productsQuery = storeid ? { store: storeid } : {};

        return await Products.find(productsQuery).sort({ price: sortOrder });

    } catch (err) {
        console.log(err);
    }
};

// Obtener todos los productos ordenados por su calificación
const getProductsSortedByRating = async (order, storeid) => {
    try {
        const sortOrder = order && order.toLowerCase() === 'asc' ? 1 : -1;
        const productsQuery = storeid ? { store: storeid } : {};

        return Products.find(productsQuery).sort({ rating: sortOrder });

        
        
    } catch (err) {
        console.log(err);
    }
};


// Obtener productos por su ID o nombre
const getProductsByIdOrName = async (identifier, storeid) => {
    try {
        const productsQuery = storeid ? { store: storeid } : {};
        const nameRegex = new RegExp(identifier, 'i');
        const products = mongoose.Types.ObjectId.isValid(identifier)
            ? await Products.findById(identifier)
            : await Products.find({ name: {$regex: nameRegex}, ...productsQuery });
        
        return products;
    } catch (err) {
        console.log(err);
    }
};


//Obtener productos filtrados por calificación y precio
const getProductsByFilter = async (minRating, maxPrice, storeid) => {
    try {

        const filter = {
            ...(minRating ? { rating: { $gte: parseFloat(minRating) } } : {}),
            ...(storeid ? { store: storeid } : {}),
            ...(maxPrice ? { price: { $lte: parseFloat(maxPrice) } } : {}),
        };
       
        return await Products.find(filter);

    } catch (err) {
        console.log(err);
    }
};

// Crear un nuevo producto

const createProduct = async (UserStoreId, name, price, rating, description,image, stock) => {
    try {
        console.log(UserStoreId);
        console.log(name);
        const store = await Store.findOne({userIdentifier: UserStoreId})
        const newProduct = new Products({
            store: store._id,
            name: name,
            price: price,
            rating: rating,
            description: description,
            image: image,
            stock: stock,
        });
        console.log(newProduct);
        await newProduct.save();

        // const store = await Store.findById(storeId);
        // store.products.push(newProduct);
        // await store.save();

        store.products.push(newProduct);
        await store.save();

        
        return newProduct;

    } catch (err) {
        console.log(err);
    }
};

// Controlador para editar un producto por su ID
const updateProduct = async (productId, name, price, rating, description, image, stock) => {
    try {
        const product = await Products.findById(productId);
    
        if (!product) return null;
    
        if (name) product.name = name;
        if (price) product.price = price;
        if (rating) product.rating = rating;
        if (description) product.description = description;
        if (image) product.image = image;
        if (stock) product.stock = stock;
    
        await product.save();

        const store = await Store.findById(product.store);
        if (!store) console.log("No store found") ;
        const productIndex = store.products.findIndex(p => p._id.equals(product._id));
        if (productIndex !== -1) store.products[productIndex] = product;
        await store.save();

        return product;

    } catch (error) {
        console.log(err);
    }
  };

module.exports = { 
    getAllProducts,
    getProductsSortedByPrice,
    getProductsSortedByRating,
    getProductsByIdOrName,
    getProductsByFilter,
    createProduct,
    updateProduct
    //getProductsByStore
};
