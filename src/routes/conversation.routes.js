const express = require("express");
const {jwtRequired} = require("../middlewares/auth");
const db = require("../models");


const routes = express.Router();

routes.get("/", async (req, res) => {
    const convo = await Conversation.findAll({ order: [["updatedAt", "DESC"]] });
    res.json(convo);
});

routes.post("/", async (req, res) => {
    const { type = "Customer_support", participantIds = [] } = req.body;
    const conversation = await Conversation.create({ type, status: "active" });
    const allConvo = [req.user.id, ...participantIds];
    await Promise.all(allConvo.map(userId => Participant.create({ userId, conversationId: conversation.id })));
    res.status(201).json(conversation);
});

routes.get("/:id/messages", async (req, res) => {
    const { id } = req.params;
    const { cursor } = req.query;
    const where = {conversationId:id};
    if (cursor) {
        where.createdAt = { lt: new Date(cursor) };
    }
    const messages = await Message.findAll({ where, order: [["createdAt", "DESC"]], limit: 30 });
    res.json(messages.reverse);
});
routes.get("/:id/history", async (req, res) => {
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

module.exports = routes;