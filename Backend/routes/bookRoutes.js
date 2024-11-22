const express = require("express");
const Book = require("../models/Book");

const router = express.Router();

// GET /books - Retrieve all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /books/:id - Retrieve a specific book
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /books - Add a new book (Admin only)
router.post("/", async (req, res) => {
  try {
    const { title, author, genre, description } = req.body;
    const newBook = new Book({ title, author, genre, description });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
