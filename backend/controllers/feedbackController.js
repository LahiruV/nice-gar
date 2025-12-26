const Feedback = require("../models/feedbackModel");

// Add feedback
exports.addFeedback = async (req, res) => {
    const { name, email, phone, message, serviceRating, country } = req.body;
    if (!name || !email || !message || serviceRating === undefined || !country) {
        return res.status(400).json({ error: "Missing feedback details" });
    }

    try {
        const feedback = new Feedback({
            name,
            email,
            phone,
            message,
            serviceRating,
            country
        });
        const savedFeedback = await feedback.save();
        res.status(201).json({
            message: "Feedback added successfully",
            feedbackId: savedFeedback._id
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all feedbacks
exports.getFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find({}).lean();
        res.json(feedbacks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a feedback
exports.deleteFeedback = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Feedback ID is required" });

    try {
        await Feedback.findByIdAndDelete(id);
        res.json({ message: "Feedback deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
