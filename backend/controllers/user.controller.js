const User = require("../models/user.model");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const logError = require("../middleware/errorLogger");

// Register a new user
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await crypto.SHA3(password).toString();
        const user = new User({ name, email,password:hashedPassword });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        logError(error, "user.controller.js", "createUser");
        res.status(400).send(error);
    }
};

// Login a user
exports.login = async (req, res) => {
    try {
        const hashedPassword = await crypto.SHA3(req.body.password).toString();
        const user = await User.findOne({ email: req.body.email, password: hashedPassword  });
        if (!user) {
            return res.status(404).send("User not found");
        }
        const token = jwt.sign({ _id : user._id }, "JSOISJDNSNSINS", { expiresIn: "1h" });
        res.status(200).send({ user, token });
    }
    catch (error) {
        logError(error, "user.controller.js", "loginUser");
        res.status(400).send(error);
    }
}

// Logout a user
exports.logout = async (req, res) => {
    try {
        res.status(200).send("User logged out");
    } catch (error) {
        logError(error, "user.controller.js", "logoutUser");
        res.status(400).send(error);
    }
};