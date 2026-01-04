const Package = require("../models/packageModel");

// Add a new package out request
exports.addPackageOutRequest = async (req, res) => {
    const { employeeId, packageName, packageDetails, date, time, location, status1, status2, status3, status4 } = req.body;
    if (!employeeId || !packageName || !packageDetails || !date || !time || !location || !status1 || !status2 || !status3 || !status4) {
        return res.status(400).json({ error: "Missing package out request details" });
    }
    try {
        const newPackage = new Package({
            employeeId,
            packageName,
            packageDetails,
            date,
            time,
            location,
            status1,
            status2,
            status3,
            status4
        });
        const savedPackage = await newPackage.save();
        res.status(201).json({ message: "Package out request added successfully", packageId: savedPackage._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Get all package out requests
exports.getPackageOutRequests = async (req, res) => {
    try {
        const packages = await Package.find({}).populate('employeeId').lean();
        const formattedPackages = packages.map(pkg => ({
            _id: pkg._id,
            employeeId: pkg.employeeId?._id,
            employeeName: pkg.employeeId ? `${pkg.employeeId.firstName} ${pkg.employeeId.lastName}` : '',
            packageName: pkg.packageName,
            packageDetails: pkg.packageDetails,
            date: pkg.date,
            time: pkg.time,
            location: pkg.location,
            status1: pkg.status1,
            status2: pkg.status2,
            status3: pkg.status3,
            status4: pkg.status4
        }));
        res.json(formattedPackages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get package out requests by employee ID
exports.getPackageOutRequestsByEmployee = async (req, res) => {
    const { employeeId } = req.params;
    if (!employeeId) return res.status(400).json({ error: "Employee ID is required" });

    try {
        const packages = await Package.find({ employeeId }).populate('employeeId').lean();
        const formattedPackages = packages.map(pkg => ({
            _id: pkg._id,
            employeeId: pkg.employeeId?._id,
            employeeName: pkg.employeeId ? `${pkg.employeeId.firstName} ${pkg.employeeId.lastName}` : '',
            packageName: pkg.packageName,
            packageDetails: pkg.packageDetails,
            date: pkg.date,
            time: pkg.time,
            location: pkg.location,
            status1: pkg.status1,
            status2: pkg.status2,
            status3: pkg.status3,
            status4: pkg.status4
        }));
        res.json(formattedPackages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a package out request
exports.updatePackageOutRequest = async (req, res) => {
    const { id, employeeId, packageName, packageDetails, date, time, location, status1, status2, status3, status4 } = req.body;
    if (!id || !employeeId || !packageName || !packageDetails || !date || !time || !location || !status1 || !status2 || !status3 || !status4) {
        return res.status(400).json({ error: "Missing package out request details" });
    }

    try {
        await Package.findByIdAndUpdate(id, {
            employeeId,
            packageName,
            packageDetails,
            date,
            time,
            location,
            status1,
            status2,
            status3,
            status4
        });
        res.json({ message: "Package out request updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a package out request
exports.deletePackageOutRequest = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Package out request ID is required" });

    try {
        await Package.findByIdAndDelete(id);
        res.json({ message: "Package out request deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
