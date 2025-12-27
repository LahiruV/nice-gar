const mongoose = require("mongoose");

const DB_URI = "mongodb+srv://user:user@cluster0.fibcxnv.mongodb.net/?appName=Cluster0";

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

module.exports = mongoose;
