const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const errorLogger = require('../middleware/errorLogger');
const mongoose = require('mongoose');

// Add a product to the cart
exports.addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({ error: 'Invalid user ID' });
        }
        
        if (productId && !mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).send({ error: 'Invalid product ID' });
        }
        
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        let cart = await Cart.findOne({ userId });
        
        if (!cart) {
            cart = new Cart({ userId, products: [{ productId, quantity }] });
        } else {
            const productIndex = cart.products.findIndex((p) => p.productId == productId);
            if (productIndex === -1) {
                cart.products.push({ productId, quantity });
            } else {
                console.log(cart.products[productIndex].quantity);
                cart.products[productIndex].quantity += quantity;
            }
        }
        await cart.save();
        res.status(200).send(cart);
    } catch (error) {
        errorLogger(error, 'cart.controller.js', 'addToCart');
        res.status(400).send(error);
    }
};

// Get the cart of a user
exports.getCart = async (req, res) => {
    try {
        const userId = req.params.userId;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, products: [] });
            await cart.save();
        }
        res.status(200).send(cart);
    }
    catch (error) {
        errorLogger(error, 'cart.controller.js', 'getCart');
        res.status(500).send(error);
    }
}

// Remove a product from the cart
exports.removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).send('Cart not found');
        }
        const productIndex = cart.products.findIndex((p) => p.productId == productId);
        if (productIndex === -1) {
            return res.status(404).send('Product not found in cart');
        }
        cart.products.splice(productIndex, 1);
        await cart.save();
        res.status(200).send(cart);
    } catch (error) {
        errorLogger(error, 'cart.controller.js', 'removeFromCart');
        res.status(400).send(error);
    }
};

// Clear the cart of a user
exports.clearCart = async (req, res) => {
    try {
        const userId = req.params.userId;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).send('Cart not found');
        }
        cart.products = [];
        await cart.save();
        res.status(200).send(cart);
    }
    catch (error) {
        errorLogger(error, 'cart.controller.js', 'clearCart');
        res.status(500).send(error);
    }
}

// Update the quantity of a product in the cart
exports.updateQuantity = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).send('Cart not found');
        }
        const productIndex = cart.products.findIndex((p) => p.productId == productId);
        if (productIndex === -1) {
            return res.status(404).send('Product not found in cart');
        }
        cart.products[productIndex].quantity = quantity;
        await cart.save();
        res.status(200).send(cart);
    }
    catch (error) {
        errorLogger(error, 'cart.controller.js', 'updateQuantity');
        res.status(500).send(error);
    }
}