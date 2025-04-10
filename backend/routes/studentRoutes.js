const express = require("express");
const bcrypt = require("bcryptjs");
const Student = require("../models/Student");

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = new Student({ name, email, password: hashedPassword });
    await newStudent.save();
    res.status(201).json({ message: "Student registered successfully" });
  } catch (err) {
    res.status(400).json({ error: "Signup failed", details: err });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ error: "User not found" });

    const match = await bcrypt.compare(password, student.password);
    if (!match) return res.status(401).json({ error: "Invalid password" });

    res.status(200).json({ message: "Login successful", userType: "student" });
  } catch (err) {
    res.status(500).json({ error: "Login error", details: err });
  }
});

module.exports = router;
