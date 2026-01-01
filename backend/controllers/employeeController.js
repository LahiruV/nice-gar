const Employee = require("../models/employeeModel");

// Add a new employee
exports.addEmployee = async (req, res) => {
    const { firstName, lastName, email, phone, password, position, image } = req.body;
    if (!firstName || !lastName || !email || !phone || !password || !position) {
        return res.status(400).json({ error: "Missing employee details" });
    }

    try {
        const newEmployee = new Employee({
            firstName,
            lastName,
            email,
            phone,
            password,
            position,
            image
        });

        const savedEmployee = await newEmployee.save();
        res.status(201).json({ message: "Employee added successfully", employeeId: savedEmployee._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all active employees
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({}).lean();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all employees
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({}).lean();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an employee
exports.updateEmployee = async (req, res) => {
    const { id, firstName, lastName, email, phone, password, position, image } = req.body;
    if (!id || !firstName || !lastName || !email || !phone || !password || !position) {
        return res.status(400).json({ error: "Missing employee details" });
    }

    try {
        await Employee.findByIdAndUpdate(id, {
            firstName,
            lastName,
            email,
            phone,
            password,
            position,
            image
        });
        res.json({ message: "Employee updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteEmployee = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Employee ID is required" });

    try {
        await Employee.findByIdAndDelete(id);
        res.json({ message: "Employee deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.employeeLogin = async (req, res) => {
    const { email, password, position } = req.body;
    if (!email || !password || !position) {
        return res.status(400).json({ error: "Missing login details" });
    }
    try {
        const employee = await Employee.findOne({ email, password, position }).lean();
        if (!employee) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        res.json({ message: "Login successful", employeeId: employee._id, employeePosition: employee.position });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
