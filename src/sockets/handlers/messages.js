module.exports = function messages(io, socket, redis) {
  // Send chat history when user connects
  redis.lrange("messages", 0, -1).then((history) => {
    const parsed = history.map((m) => JSON.parse(m));
    socket.emit("messages:history", parsed);
  });

  socket.on("message:send", async (data) => {
    const msg = {
      from: socket.user?.id || socket.handshake.query.id,
      role: socket.user?.role || socket.handshake.query.role || "customer",
      text: data.text,
      timestamp: Date.now(),
    };

    await redis.rpush("messages", JSON.stringify(msg));

    io.emit("message:new", msg);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
};