const mongoose = require("mongoose");

// Define the schema for the ErrorLog model
const ErrorLogSchema = new mongoose.Schema({
     message: {
          type: String,
          required: true,
          trim: true,
     },
     stack: {
          type: String,
          required: true,
     },
     statusCode: {
          type: Number,
          required: true,
     },
     source: {
          type: String,
          required: true,
          trim: true,
     },
     endpoint: {
          type: String,
          required: true,
          trim: true,
     },
     createdAt: {
          type: Date,
          default: Date.now,
     },
});

// Create and export the ErrorLog model
const ErrorLog = mongoose.model("ErrorLogs", ErrorLogSchema);

module.exports = ErrorLog;
