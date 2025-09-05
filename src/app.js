const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const { corsOrigin } = require("./config/env");

const authRoutes = require("./routes/auth.routes");
const conversationsRoutes = require("./routes/conversation.routes");
const messagesRoutes = require("./routes/messages.routes");

const app = express();

// Serve static files from public folder (go up one level from src/)
app.use(express.static(path.join(__dirname, "../public")));

app.use(helmet());
app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(rateLimit({ windowMs: 60_000, max: 200 }));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/auth", authRoutes);
app.use("/conversations", conversationsRoutes);
app.use("/messages", messagesRoutes);

module.exports = app;
