const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String },
  avgRating: { type: Number, default: 0 },
});

module.exports = mongoose.model("Book", bookSchema);
