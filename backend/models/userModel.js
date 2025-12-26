const mongoose = require("./db");

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    isAdmin: { type: Number, default: 0 } // keep INTEGER
});

module.exports = mongoose.model("User", userSchema);
