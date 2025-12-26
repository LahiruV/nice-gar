const mongoose = require("./db");

const feedbackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    message: String,
    serviceRating: Number, // REAL
    country: String
});

module.exports = mongoose.model("Feedback", feedbackSchema);
