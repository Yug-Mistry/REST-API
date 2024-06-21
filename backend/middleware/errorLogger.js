const ErrorLog = require("../models/ErrorLogModel");

// Function to log an error
const logError = async (error, source, endpoint) => {
     const errorLog = new ErrorLog({
          message: error.message,
          stack: error.stack,
          statusCode: error.statusCode || 500,
          source: source,
          endpoint: endpoint,
     });

     try {
          await errorLog.save();
          console.log("Error logged:", errorLog);
     } catch (err) {
          console.error("Failed to log error:", err);
     }
};

module.exports = logError;
