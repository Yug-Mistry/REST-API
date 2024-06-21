const mongoose = require("mongoose");
const logError = require("./middleware/errorLogger");

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
// Connect to MongoDB
mongoose
     .connect(mongoURI, {})
     .then(() => {
          console.log("Connected to MongoDB");
     })
     .catch((err) => {
          console.error("Error connecting to MongoDB:", err);
          logError(err, "MongoDB Connection", "server.js");
     });
