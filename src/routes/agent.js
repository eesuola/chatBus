const express = require("express");
const router = express.Router();

const db = require("../models");


// Assign conversation to an agent
router.post("/assign", async (req, res) => {
  try {
    const { messageId, agentId } = req.body;
    const message = await Message.findByPk(messageId);
    if (!message) return res.status(404).json({ error: "Message not found" });

    message.agentId = agentId;
    await message.save();
    res.json({ success: true, message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Transfer to another agent
router.post("/transfer", async (req, res) => {
  try {
    const { messageId, newAgentId } = req.body;
    const message = await Message.findByPk(messageId);
    if (!message) return res.status(404).json({ error: "Message not found" });

    message.agentId = newAgentId;
    await message.save();
    res.json({ success: true, message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Close a conversation
router.post("/close", async (req, res) => {
  try {
    const { messageId } = req.body;
    const message = await Message.findByPk(messageId);
    if (!message) return res.status(404).json({ error: "Message not found" });

    message.closed = true;
    await message.save();
    res.json({ success: true, message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
