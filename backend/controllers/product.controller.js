const Product = require("../models/product.model");
const errorLogger = require("../middleware/errorLogger");

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, imageUrl } = req.body;
        const product = new Product({ name, description, price, image: imageUrl });
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        errorLogger(error, "product.controller.js", "createProduct");
        res.status(400).send(error);
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).send(products);
    } catch (error) {
        errorLogger(error, "product.controller.js", "getAllProducts");
        res.status(500).send(error);
    }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.status(200).send(product);
    } catch (error) {
        errorLogger(error, "product.controller.js", "getProductById");
        res.status(500).send(error);
    }
};