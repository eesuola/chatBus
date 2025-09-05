module.exports = function presence(io, socket, redis) {
  const uid = socket.user?.id || socket.handshake.query.id;
  const role = socket.user?.role || socket.handshake.query.role || "customer";
  const key = `presence:${uid}`;

  // Mark as online when connected
  (async () => {
    await redis.hset(
      key,
      "online", "1",
      "lastSeen", Date.now().toString(),
      "role", role
    );
    await redis.expire(key, 60 * 10); // 10 min TTL
    io.emit("presence:update", { userId: uid, online: true, role });
  })();

  // Handle disconnect
  socket.on("disconnect", async () => {
    await redis.hset(
      key,
      "online", "0",
      "lastSeen", Date.now().toString(),
      "role", role
    );
    io.emit("presence:update", {
      userId: uid,
      online: false,
      lastSeen: Date.now(),
      role,
    });
  });
};
