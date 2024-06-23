const mongoose = require("mongoose");

// Define the schema for the User model
const UserSchema = mongoose.Schema({
	_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
	name: { type: String, required: true, trim: true },
	email: { type: String, required: true, unique: true, trim: true },
	password: { type: String, required: true },
	address: { type: String, trim: true },
	phone: { type: String, trim: true },
	paymentDetails: {
		cardNumber: { type: String, trim: true },
		expiryDate: { type: String, trim: true },
		cvv: { type: String, trim: true },
	},
	createdAt: { type: Date, default: Date.now },
});

// Create and export the User model
const User = mongoose.model("User", UserSchema);

module.exports = User;
