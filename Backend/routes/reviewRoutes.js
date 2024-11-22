const express = require("express");
const Review = require("../models/Review");

const router = express.Router();

// GET /reviews - Retrieve reviews for a book
router.get("/", async (req, res) => {
  try {
    const { bookId } = req.query;
    const reviews = await Review.find({ bookId }).populate("userId", "username");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /reviews - Submit a new review
router.post("/", async (req, res) => {
  try {
    const { bookId, userId, reviewText, rating } = req.body;
    const newReview = new Review({ bookId, userId, reviewText, rating });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
