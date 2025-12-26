const mongoose = require("./db");

const bookingSchema = new mongoose.Schema({
    packageId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    travelDate: { type: String, required: true },
    adults: { type: Number, required: true },
    children: { type: Number, required: true },
    mealPlan: { type: String, enum: ["bb", "hb", "fb"], required: true },
    includeTransport: { type: Number, enum: [0, 1], required: true },
    includeAccommodation: { type: Number, enum: [0, 1], required: true },
    specialRequests: String,
    increasePrice: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" }
});

module.exports = mongoose.model("Booking", bookingSchema);
