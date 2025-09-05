const express = require("express");
const {jwtRequired} = require("../middlewares/auth");
const db = require("../models");


const routes = express.Router();
routes.use(jwtRequired);

routes.post("/", async (req, res) => {
    const { conversationId, body, data } = req.body;
    const message = await Message.create({ conversationId, senderId: req.user.id, body, data});
    res.status(201).json(message);
});

module.exports = routes;
