const jwt = require("jsonwebtoken");
const logError = require("../middleware/errorLogger");

module.exports = (req, res, next) => {
	try {
		const authHeader = req.headers["authorization"];
		const token = authHeader && authHeader.split(" ")[1];

		if (!token) {
			return res.status(403).send("Access denied.");
		}

		const decoded = jwt.verify(token, "JSOISJDNSNSINS");
		req.user = decoded;
		next();
	} catch (error) {
		logError(error, "auth.js", "Token verification");
		res.status(400).send("Invalid token");
	}
};
