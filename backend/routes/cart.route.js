const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

// Add a product to the cart
router.post('/add', cartController.addToCart);

// Get the cart of a user
router.get('/:userId', cartController.getCart);

// Remove a product from the cart
router.delete('/remove', cartController.removeFromCart);

// Clear the cart of a user
router.delete('/clear/:userId', cartController.clearCart);

// Update the quantity of a product in the cart
router.put('/update', cartController.updateQuantity);

// Export the router
module.exports = router;