// scripts/genAgentToken.js
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../src/config/env");

const token = jwt.sign({ id: "agent_001", role: "agent" }, jwtSecret, {
  expiresIn: "1h",
});

console.log("Test Agent Token:", token);
