const mongoose = require("./db");

const packageSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    price: String,
    duration: String,
    groupSize: String,
    startDate: String,
    isActive: { type: Number, default: 1 } // INTEGER
});

module.exports = mongoose.model("Package", packageSchema);
