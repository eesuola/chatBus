const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models"); // ✅ loads index.js, which now wires associations

const { jwtSecret } = require("../config/env");

const User = db.User;  // extract User model
const routes = express.Router();

// User Registration
routes.post("/register", async (req, res) => {
  try {
    const { name, displayName, email, password, role } = req.body;

    // check if user exists
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      displayName,
      email,
      password: hashedPassword,
      role: role || "customer",
    });

    res.json({ message: "User registered successfully", user: { id: user.id, email: user.email } });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// User Login
routes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    jwtSecret,
    { expiresIn: "7d" }
  );
  res.json({ token });
});

module.exports = routes;
