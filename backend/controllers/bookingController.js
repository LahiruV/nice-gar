const Booking = require("../models/bookingModel");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
// CREATE
exports.bookTicket = async (req, res) => {
    const {
        packageId, firstName, lastName, email, phone, travelDate,
        adults, children, mealPlan, includeTransport, includeAccommodation,
        specialRequests, increasePrice = 0, discount = 0, status = 'pending'
    } = req.body;

    if (!packageId || !firstName || !lastName || !email || !phone || !travelDate ||
        adults == null || children == null || !mealPlan ||
        includeTransport == null || includeAccommodation == null) {
        return res.status(400).json({ error: "Missing booking details" });
    }

    try {
        const booking = new Booking({
            packageId,
            firstName,
            lastName,
            email,
            phone,
            travelDate,
            adults,
            children,
            mealPlan,
            includeTransport: includeTransport ? 1 : 0,
            includeAccommodation: includeAccommodation ? 1 : 0,
            specialRequests: specialRequests || null,
            increasePrice,
            discount,
            status
        });

        const savedBooking = await booking.save();
        res.status(201).json({ message: "Booking successful", bookingId: savedBooking._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// READ all bookings with package info and totalPrice
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.aggregate([
            {
                $addFields: {
                    packageIdObj: { $toObjectId: "$packageId" }
                }
            },
            {
                $lookup: {
                    from: "packages",
                    localField: "packageIdObj",
                    foreignField: "_id",
                    as: "package"
                }
            },
            { $unwind: "$package" },
            {
                $addFields: {
                    totalPrice: {
                        $add: [
                            { $multiply: ["$adults", { $toDouble: "$package.price" }] },
                            { $divide: [{ $multiply: ["$children", { $toDouble: "$package.price" }] }, 2] },
                            "$increasePrice",
                            { $multiply: ["$discount", -1] }
                        ]
                    },
                    packageTitle: "$package.title",
                    packageDescription: "$package.description",
                    packagePrice: "$package.price",
                    packageImage: "$package.image"
                }
            },
            { $sort: { _id: -1 } }
        ]);
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// READ last 3 bookings
exports.getRecentBookings = async (req, res) => {
    try {
        const bookings = await Booking.aggregate([
            { $sort: { _id: -1 } },
            { $limit: 3 },
            {
                $addFields: {
                    packageIdObj: { $toObjectId: "$packageId" } // convert string to ObjectId
                }
            },
            {
                $lookup: {
                    from: "packages",
                    localField: "packageIdObj",
                    foreignField: "_id",
                    as: "package"
                }
            },
            { $unwind: "$package" },
            {
                $addFields: {
                    totalPrice: {
                        $add: [
                            { $multiply: ["$adults", { $toDouble: "$package.price" }] },
                            { $divide: [{ $multiply: ["$children", { $toDouble: "$package.price" }] }, 2] },
                            "$increasePrice",
                            { $multiply: ["$discount", -1] }
                        ]
                    },
                    packageTitle: "$package.title",
                    packageDescription: "$package.description",
                    packagePrice: "$package.price",
                    packageImage: "$package.image"
                }
            }
        ]);
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Dashboard stats
exports.getBookingDashboard = async (req, res) => {
    try {
        const stats = await Booking.aggregate([
            {
                $addFields: {
                    packageIdObj: { $toObjectId: "$packageId" } // convert string to ObjectId
                }
            },
            {
                $lookup: {
                    from: "packages",
                    localField: "packageIdObj",
                    foreignField: "_id",
                    as: "package"
                }
            },
            { $unwind: "$package" },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: {
                            $cond: [
                                { $eq: ["$status", "confirmed"] },
                                {
                                    $add: [
                                        { $multiply: ["$adults", { $toDouble: "$package.price" }] },
                                        { $divide: [{ $multiply: ["$children", { $toDouble: "$package.price" }] }, 2] },
                                        "$increasePrice",
                                        { $multiply: ["$discount", -1] }
                                    ]
                                },
                                0
                            ]
                        }
                    },
                    pendingCount: {
                        $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] }
                    },
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json(stats[0] || { count: 0, totalRevenue: 0, pendingCount: 0 });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all simple bookings
exports.getAllSimpleBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({}).lean();
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE booking
exports.updateBooking = async (req, res) => {
    const { id, ...updateFields } = req.body;
    if (!id) return res.status(400).json({ error: "Missing booking ID" });

    // Convert booleans to integers to match original schema
    if (updateFields.includeTransport != null)
        updateFields.includeTransport = updateFields.includeTransport ? 1 : 0;
    if (updateFields.includeAccommodation != null)
        updateFields.includeAccommodation = updateFields.includeAccommodation ? 1 : 0;

    try {
        await Booking.findByIdAndUpdate(id, updateFields);
        res.json({ message: "Booking updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE booking status only
exports.updateBookingStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!id || !status) return res.status(400).json({ error: "Missing booking ID or status" });

    try {
        await Booking.findByIdAndUpdate(id, { status });
        res.json({ message: "Booking status updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE booking
exports.deleteBooking = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Booking ID is required" });

    try {
        await Booking.findByIdAndDelete(id);
        res.json({ message: "Booking deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
