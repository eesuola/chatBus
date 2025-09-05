const Redis = require("ioredis");
const { redisUrl } = require("../../config/env");

const redis = new Redis(process.env.REDIS_URL);

module.exports = function messages(io, socket) {
  socket.on("message:send", async (data) => {
    const msg = {
      from: socket.user?.id || socket.handshake.query.id,
      role: socket.user?.role || socket.handshake.query.role || "customer",
      text: data.text,
      timestamp: Date.now()
    };

    // Save message to Redis list
    await redis.rpush("messages", JSON.stringify(msg));

    // Broadcast to everyone
    io.emit("message:new", msg);
  });
};
