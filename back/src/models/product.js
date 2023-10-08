const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Agregar validaciones al product

const productSchema = new Schema({
    store: { type: Schema.Types.ObjectId, ref: 'Store', required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    rating: {type: Number, default: 0},
    description: {type: String, minlength: 10, maxlength: 2000 },
    image: {type: String, default: "https://cocina-casera.com/wp-content/uploads/2023/06/pizza-napolitana-770x485.jpeg"},
    created: {type: Date, default: Date.now},
    
});

const Products = mongoose.model('Product', productSchema);


module.exports = {Products};