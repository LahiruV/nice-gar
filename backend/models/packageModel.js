const mongoose = require("./db");

const packageSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    packageName: {
        type: String,
        required: true
    },
    packageDetails: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    status1: {
        type: Number,
        required: true
    },
    status2: {
        type: Number,
        required: true
    },
    status3: {
        type: Number,
        required: true
    },
    status4: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Package", packageSchema);
