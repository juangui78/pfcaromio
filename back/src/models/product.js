const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Agregar validaciones al product

const productSchema = new Schema({
    store: { type: Schema.Types.ObjectId, ref: 'Store', required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    rating: {type: Number, default: 0},
    stock: {type: Number, default: 0},
    description: {type: String, minlength: 10, maxlength: 2000 },
    image: {type: String, required: false},
    created: {type: Date, default: Date.now},
    enabled: { type: Boolean, default: true }
});

const Products = mongoose.model('Product', productSchema);


module.exports = {Products};