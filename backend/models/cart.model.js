const mongoose = require('mongoose');
const Product = require('./product.model');

// Define the schema for the Cart model
const CartSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'User'
    },
    // default value is an empty array
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }]
});

// Create and export the Cart model
const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;