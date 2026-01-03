const express = require("express");
const router = express.Router();
const controller = require("../controllers/leaveController");

router.post("/add", controller.addLeaveRequest);
router.get("/", controller.getLeaveRequests);
router.get("/employee/:employeeId", controller.getLeaveRequestsByEmployee);
router.put("/update", controller.updateLeaveRequest);
router.delete("/delete/:id", controller.deleteLeaveRequest);

module.exports = router;