const express = require("express");
const db = require("../models");

const router = express.Router();

// GET /conversations/:id/history
router.get("/:id/history", async (req, res) => {
  try {
    const convo = await Conversation.findByPk(req.params.id, {
      include: [{ model: Message, order: [["createdAt", "ASC"]] }],
    });
    if (!convo) return res.status(404).json({ error: "Conversation not found" });
    res.json(convo.Messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
