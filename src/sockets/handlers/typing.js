module.exports = function typing(io, socket) {
  socket.on("typing:start", () => {
    io.emit("typing:update", {
      userId: socket.user?.id || socket.handshake.query.id,
      role: socket.user?.role || socket.handshake.query.role || "customer",
      typing: true
    });
  });

  socket.on("typing:stop", () => {
    io.emit("typing:update", {
      userId: socket.user?.id || socket.handshake.query.id,
      role: socket.user?.role || socket.handshake.query.role || "customer",
      typing: false
    });
  });
};
