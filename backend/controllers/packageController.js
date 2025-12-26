const Package = require("../models/packageModel");

// Add a new package
exports.addPackage = async (req, res) => {
    const { title, description, image, price, duration, groupSize, startDate } = req.body;
    if (!title || !description || !image || !price || !duration || !groupSize || !startDate) {
        return res.status(400).json({ error: "Missing package details" });
    }

    try {
        const newPackage = new Package({
            title,
            description,
            image,
            price,
            duration,
            groupSize,
            startDate,
            isActive: 1 // maintain INTEGER type
        });

        const savedPackage = await newPackage.save();
        res.status(201).json({ message: "Package added successfully", packageId: savedPackage._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all active packages
exports.getPackages = async (req, res) => {
    try {
        const packages = await Package.find({ isActive: 1 }).lean();
        res.json(packages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all packages
exports.getAllPackages = async (req, res) => {
    try {
        const packages = await Package.find({}).lean();
        res.json(packages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a package
exports.updatePackage = async (req, res) => {
    const { id, title, description, image, price, duration, groupSize, startDate } = req.body;
    if (!id || !title || !description || !image || !price || !duration || !groupSize || !startDate) {
        return res.status(400).json({ error: "Missing package details" });
    }

    try {
        await Package.findByIdAndUpdate(id, {
            title,
            description,
            image,
            price,
            duration,
            groupSize,
            startDate
        });
        res.json({ message: "Package updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// "Soft-delete" a package by setting isActive = 0
exports.deletePackage = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Package ID is required" });

    try {
        await Package.findByIdAndUpdate(id, { isActive: 0 });
        res.json({ message: "Package deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
