const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");

router.post("/login", controller.login);
router.post("/signup", controller.signup);
router.get("/logout", controller.logout);
router.get("/", controller.allUsers);

module.exports = router;