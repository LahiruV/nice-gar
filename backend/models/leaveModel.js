const mongoose = require("./db");

const leaveSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status1: {
        type: Boolean,
        default: false
    },
    status2: {
        type: Boolean,
        default: false
    },
    status3: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Leave", leaveSchema);
