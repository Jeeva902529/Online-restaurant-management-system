const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,  // Rating out of 5 stars, for example
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);
