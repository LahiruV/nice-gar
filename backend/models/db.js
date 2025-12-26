const mongoose = require("mongoose");

const DB_URI = "mongodb+srv://user:user@elishiya.m91w3kg.mongodb.net/?retryWrites=true&w=majority&appName=Elishiya";

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

module.exports = mongoose;
