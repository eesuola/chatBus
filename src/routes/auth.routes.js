const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models"); // ✅ loads index.js, which now wires associations

const {jwtSecret} = require("../config/env");

const routes = express.Router();

// User Registration
routes.post("/register", async (req, res) => {
    const { displayName, password, email, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ displayName, password: hashedPassword, email, role });
    res.status(201).json(user);
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
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, jwtSecret, {expiresIn: "7d"});
    res.json({ token });
});

module.exports = routes;