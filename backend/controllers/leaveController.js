const Leave = require("../models/leaveModel");

// Add a new leave request
exports.addLeaveRequest = async (req, res) => {
    const { employeeId, startDate, endDate, reason, status1, status2, status3 } = req.body;
    if (!employeeId || !startDate || !endDate || !reason || status1 === undefined || status2 === undefined || status3 === undefined) {
        return res.status(400).json({ error: "Missing leave request details" });
    }
    try {
        const newLeave = new Leave({
            employeeId,
            startDate,
            endDate,
            reason,
            status1,
            status2,
            status3
        });
        const savedLeave = await newLeave.save();
        res.status(201).json({ message: "Leave request added successfully", leaveId: savedLeave._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Get all leave requests
exports.getLeaveRequests = async (req, res) => {
    try {
        const leaves = await Leave.find({}).populate('employeeId').lean();
        const formattedLeaves = leaves.map(leave => ({
            _id: leave._id,
            employeeId: leave.employeeId?._id,
            employeeName: leave.employeeId ? `${leave.employeeId.firstName} ${leave.employeeId.lastName}` : '',
            startDate: leave.startDate,
            endDate: leave.endDate,
            reason: leave.reason,
            status1: leave.status1,
            status2: leave.status2,
            status3: leave.status3
        }));
        res.json(formattedLeaves);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get leave requests by employee ID
exports.getLeaveRequestsByEmployee = async (req, res) => {
    const { employeeId } = req.params;
    if (!employeeId) return res.status(400).json({ error: "Employee ID is required" });

    try {
        const leaves = await Leave.find({ employeeId }).populate('employeeId').lean();
        const formattedLeaves = leaves.map(leave => ({
            _id: leave._id,
            employeeId: leave.employeeId?._id,
            employeeName: leave.employeeId ? `${leave.employeeId.firstName} ${leave.employeeId.lastName}` : '',
            startDate: leave.startDate,
            endDate: leave.endDate,
            reason: leave.reason,
            status1: leave.status1,
            status2: leave.status2,
            status3: leave.status3
        }));
        res.json(formattedLeaves);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an leave request
exports.updateLeaveRequest = async (req, res) => {
    const { id, employeeId, startDate, endDate, reason, status1, status2, status3 } = req.body;
    if (!id || !employeeId || !startDate || !endDate || !reason || status1 === undefined || status2 === undefined || status3 === undefined) {
        return res.status(400).json({ error: "Missing leave request details" });
    }

    try {
        await Leave.findByIdAndUpdate(id, {
            employeeId,
            startDate,
            endDate,
            reason,
            status1,
            status2,
            status3
        });
        res.json({ message: "Leave request updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a leave request
exports.deleteLeaveRequest = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Leave request ID is required" });

    try {
        await Leave.findByIdAndDelete(id);
        res.json({ message: "Leave request deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
