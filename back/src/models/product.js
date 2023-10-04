const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {type: String, required: true},
    storeId: {type: String, default: '_1'},
    price: {type: Number, required: true},
    rating: {type: Number, default: 0},
    description: {type: String},
    image: {type: String, default: "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=300"},
    created: {type: Date, default: Date.now},
    stock: {type: Number, min: 0, default:0}
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;