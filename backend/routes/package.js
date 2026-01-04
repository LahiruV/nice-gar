const express = require("express");
const router = express.Router();
const controller = require("../controllers/packageController");

router.post("/add", controller.addPackageOutRequest);
router.get("/", controller.getPackageOutRequests);
router.get("/employee/:employeeId", controller.getPackageOutRequestsByEmployee);
router.put("/update", controller.updatePackageOutRequest);
router.delete("/delete/:id", controller.deletePackageOutRequest);

module.exports = router;