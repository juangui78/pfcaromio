const { Products } = require('../models/product');
const { Store } = require('../models/store');
const mongoose = require('mongoose');

//Obtener todos los productos
const getAllProducts = async (storeId) => {
    try {
        // await Products.updateMany({}, { $set: { enabled: true } }); // codigo para actualizar todos los productos a true.
        const productsQuery = await storeId ? { store: storeId} : { };
        console.log(productsQuery)
        return await Products.find(productsQuery);
    } catch (err) {
        console.log(err);
    }
};

// Obtener todos los productos ordenados por su precio
const getProductsSortedByPrice = async (order, storeId) => {
    try {
        const sortOrder = order && order.toLowerCase() === 'asc' ? 1 : -1;
        const productsQuery = storeId ? { store: storeId, enabled: true } : { enabled: true };

        return await Products.find(productsQuery).sort({ price: sortOrder });

    } catch (err) {
        console.log(err);
    }
};

// Obtener todos los productos ordenados por su calificación
const getProductsSortedByRating = async (order, storeId) => {
    try {
        const sortOrder = order && order.toLowerCase() === 'asc' ? 1 : -1;
        const productsQuery = storeId ? { store: storeId, enabled: true } : { enabled: true };

        return Products.find(productsQuery).sort({ rating: sortOrder });

        
        
    } catch (err) {
        console.log(err);
    }
};


// Obtener productos por su ID o nombre
const getProductsByIdOrName = async (identifier, storeId) => {
    try {
        const productsQuery = storeId ? { store: storeId, enabled: true } : { enabled: true };
        const nameRegex = new RegExp(identifier, 'i');
        const products = mongoose.Types.ObjectId.isValid(identifier)
            ? await Products.findById(identifier)
            : await Products.find({ name: { $regex: nameRegex }, ...productsQuery });

        return products;
    } catch (err) {
        console.log(err);
    }
};


//Obtener productos filtrados por calificación y precio
const getProductsByFilter = async (minRating, maxPrice, storeId) => {
    try {

        const filter = {
            ...(minRating ? { rating: { $gte: parseFloat(minRating) } } : {}),
            ...(storeId ? { store: storeId, enabled: true } : { enabled: true }),
            ...(maxPrice ? { price: { $lte: parseFloat(maxPrice) } } : {}),
        };

        return await Products.find(filter);

    } catch (err) {
        console.log(err);
    }
};

// Crear un nuevo producto

const createProduct = async (UserStoreId, name, price, rating, description, image, stock) => {
    try {
        console.log(UserStoreId);
        console.log(name);
        const store = await Store.findOne({ userIdentifier: UserStoreId })
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
        if (!store) console.log("No store found");
        const productIndex = store.products.findIndex(p => p._id.equals(product._id));
        if (productIndex !== -1) store.products[productIndex] = product;
        await store.save();

        return product;

    } catch (error) {
        console.log(err);
    }
};

const deleteProduct = async (productId) => {
    try {
        const product = await Products.findById(productId);
        console.log('Prod:', product)

        const store = await Store.findById(product.store);


        if (!store) return console.log("No store found");
        const productIndex = store.products.findIndex(p => p._id.equals(productId));
        console.log('productIndex:', productIndex)
        store.products.splice(productIndex, 1);
        console.log('product list:', store.products)
        //if (productIndex !== -1) store.products.splice(productIndex,0);
        await store.save();
        const deleted = await Products.deleteOne({ _id: productId });
        return deleted;
    } catch (error) {
        console.log(err);
    }
}

const toggleEnabled = async (productId) => {
    try {
        const product = await Products.findById(productId);
        
        if (!product) {
            console.log("Producto no encontrado");
            return;
        }

        product.enabled = !product.enabled;

        await product.save();

        console.log(`'enabled' para el producto ${productId} ha sido cambiado a ${product.enabled}`);
        return product
    } catch (error) {
        console.error('Error al cambiar el estado de "enabled":', error);
    }
};


module.exports = {
    getAllProducts,
    getProductsSortedByPrice,
    getProductsSortedByRating,
    getProductsByIdOrName,
    getProductsByFilter,
    createProduct,
    updateProduct,
    deleteProduct,
    toggleEnabled
};
