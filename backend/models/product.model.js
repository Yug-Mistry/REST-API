const mongoose = require("mongoose");

// Define the schema for the Product model
const ProductSchema = new mongoose.Schema({
	_id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
	name: {
		type: String,
		required: true,
		trim: true,
	},
	price: {
		type: Number,
		required: true,
		min: 0,
	},
	description: {
		type: String,
		required: true,
		trim: true,
	},
	image: {
		type: String, // URL or path to the image file
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

// Pre-save hook to update the updatedAt field
ProductSchema.pre("save", function (next) {
	this.updatedAt = Date.now();
	next();
});

// Create and export the Product model
const Product = mongoose.model("Products", ProductSchema);

module.exports = Product;
