const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    user: { type: String, required: true }, // User Identifier
    rating: { type: Number, required: true },
    comment: { type: String },
    created: { type: Date, default: Date.now },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
