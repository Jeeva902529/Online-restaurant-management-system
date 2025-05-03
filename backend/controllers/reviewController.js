const Review = require("../models/Review");

// Add Review
const addReview = async (req, res) => {
  const { username, review, rating } = req.body;

  try {
    const newReview = new Review({ username, review, rating });
    await newReview.save();
    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add review" });
  }
};

// Get All Reviews
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });  // Sorted by latest review
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

module.exports = { addReview, getReviews };
