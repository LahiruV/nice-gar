const express = require("express");
const router = express.Router();
const controller = require("../controllers/packageController");

router.post("/add", controller.addPackage);
router.get("/", controller.getPackages);
router.get("/all", controller.getAllPackages);
router.put("/update", controller.updatePackage);
router.delete("/delete/:id", controller.deletePackage);

module.exports = router;