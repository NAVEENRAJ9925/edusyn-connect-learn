const express = require("express");
const bcrypt = require("bcryptjs");
const Staff = require("../models/Staff");

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newStaff = new Staff({ name, email, password: hashedPassword });
    await newStaff.save();
    res.status(201).json({ message: "Staff registered successfully" });
  } catch (err) {
    res.status(400).json({ error: "Signup failed", details: err });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const staff = await Staff.findOne({ email });
    if (!staff) return res.status(404).json({ error: "User not found" });

    const match = await bcrypt.compare(password, staff.password);
    if (!match) return res.status(401).json({ error: "Invalid password" });

    res.status(200).json({ message: "Login successful", userType: "staff" });
  } catch (err) {
    res.status(500).json({ error: "Login error", details: err });
  }
});

module.exports = router;
