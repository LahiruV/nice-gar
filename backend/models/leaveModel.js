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
        type: Number,
        default: 1
    },
    status2: {
        type: Number,
        default: 1
    },
    status3: {
        type: Number,
        default: 1
    },
    status4: {
        type: Number,
        default: 1
    }
});

module.exports = mongoose.model("Leave", leaveSchema);
