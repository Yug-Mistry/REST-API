// config/database.js
const mongoose = require("mongoose");
const logError = require("../middleware/errorLogger");

// MongoDB connection
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error("Error: MONGO_URI is not defined in environment variables.");
    process.exit(1); // Exit the application if MONGO_URI is not set
}

// Connect to MongoDB
mongoose
    .connect(mongoURI, {})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
