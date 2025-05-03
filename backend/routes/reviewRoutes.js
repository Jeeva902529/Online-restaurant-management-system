const express = require("express");
const router = express.Router();
const { addReview, getReviews } = require("../controllers/reviewController");

// Route for adding a review
router.post("/add", addReview);

// Route for fetching all reviews
router.get("/", getReviews);

module.exports = router;
