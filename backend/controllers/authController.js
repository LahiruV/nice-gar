const User = require("../models/userModel");

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userData = await User.findOne({ email, password }).lean();
        if (!userData) return res.status(401).json({ error: "Invalid credentials" });

        req.session.user = {
            email: userData.email,
            name: userData.name,
            isAdmin: userData.isAdmin
        };

        res.json({ message: "Login successful", user: req.session.user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get single user by email
exports.getUser = async (email) => {
    try {
        const user = await User.findOne({ email }).lean();
        return user;
    } catch (err) {
        throw err;
    }
};

// Get all users
exports.allUsers = async (req, res) => {
    try {
        const users = await User.find({}).lean();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Logout
exports.logout = async (req, res) => {
    try {
        await new Promise((resolve, reject) => {
            req.session.destroy(err => {
                if (err) reject(err);
                else resolve();
            });
        });
        res.json({ message: "Logged out" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Signup
exports.signup = async (req, res) => {
    let { name, email, password, isAdmin } = req.body;
    if (isAdmin === undefined) isAdmin = true; // keep default logic

    try {
        const existingUser = await User.findOne({ email }).lean();
        if (existingUser) return res.status(400).json({ error: "Email already in use" });

        const newUser = new User({ name, email, password, isAdmin });
        await newUser.save();

        res.status(201).json({ message: "User registered" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
