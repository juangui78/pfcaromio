const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    
    username: {
      type: String,
      minlength: 3,   // Minimum length
      maxlength: 30,  // Maximum length
    },
    //password not required 
    email: {
      type: String,
      required: true,
      unique: true,    // Field must be unique
      match: /^\S+@\S+\.\S+$/, // Regular expression for email validation
    },
    age: {
      type: Number,
      min: 18,        // Minimum value
      max: 100,       // Maximum value
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    role:{
      type: String,
      enum: ['Admin', 'Seller', 'Buyer'],
      default: "Buyer"
    },

    userIdentifier: {
      type: String,
      required: true,
    },

    store: { type: Schema.Types.ObjectId, ref: 'Store'}
    
  });

  const User = mongoose.model('User', userSchema);


  module.exports = {User};