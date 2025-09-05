const Redis = require("ioredis");
const { redisUrl } = require("../../config/env");

const redis = new Redis(redisUrl);

module.exports = function presence(io, socket) {
  const uid = socket.user?.id || socket.handshake.query.id;
  const role = socket.user?.role || socket.handshake.query.role || "guest";

  if (!uid) return;

  const key = `presence:${uid}`;

  async function setOnline() {
    await redis.hset(key, {
      online: "1",
      lastSeen: Date.now().toString(),
      role
    });
    await redis.expire(key, 60 * 10); // auto-expire in 10 minutes
    io.emit("presence:update", { userId: uid, role, online: true });
  }

  async function setOffline() {
    await redis.hset(key, {
      online: "0",
      lastSeen: Date.now().toString(),
      role
    });
    io.emit("presence:update", { userId: uid, role, online: false, lastSeen: Date.now() });
  }

  // when connected
  setOnline();

  // when disconnected
  socket.on("disconnect", setOffline);
};
