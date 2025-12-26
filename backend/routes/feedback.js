const express = require("express");
const router = express.Router();
const controller = require("../controllers/feedbackController");

router.post("/add", controller.addFeedback);
router.get("/", controller.getFeedbacks);
router.delete("/delete/:id", controller.deleteFeedback);

module.exports = router;