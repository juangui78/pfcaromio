const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const storeSchema = new Schema({
    // user: {type: Schema.Types.ObjectId, ref: 'User', required: true,},
    name: {type: String, required: true},
    address: {type: String, required: true},
    rating: {type: Number, default: 0},
    revenue: {type: Number, default: 0},
    image: {type: String, default: "https://play-lh.googleusercontent.com/vMwnJ9ADxr9mK8eI9iT96PajN0yGnY2y4QlnW9Zm1y9UN_w8xXruVyO5Hh6U2tGtFaAU"},
    userIdentifier: {type: String, required: true},
    description: {type: String, required: true},
    //aqui se relacionan los productos
    products: {type: Array}    
});

const Store = mongoose.model('Store', storeSchema);

module.exports = {Store};


