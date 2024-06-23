// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const logError = require("./middleware/errorLogger");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoose = require("./config/database");

// Routes
const productRouter = require("./routes/product.route");
const cartRouter = require("./routes/cart.route");
const userRouter = require("./routes/user.route");

app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/users", userRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
