const express = require("express");
const router = express.Router();
const controller = require("../controllers/employeeController");

router.post("/add", controller.addEmployee);
router.get("/", controller.getEmployees);
router.get("/all", controller.getAllEmployees);
router.put("/update", controller.updateEmployee);
router.delete("/delete/:id", controller.deleteEmployee);
router.post("/login", controller.employeeLogin);

module.exports = router;