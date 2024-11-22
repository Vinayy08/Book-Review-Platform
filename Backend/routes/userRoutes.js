const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// POST /users/register - Register a new user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    const user=await newUser.save();
    res.status(201).json({user:user, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /users/login - Authenticate a user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// GET /users/:id - Retrieve user details by ID
router.get("/:id", async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId).select("-password"); // Exclude password for security
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user by ID:", error.message); // Log the error
      res.status(500).json({ message: error.message });
    }
  });
  

module.exports = router;
