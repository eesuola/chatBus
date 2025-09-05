const { Server } = require("socket.io");
const { createAdapter } = require("@socket.io/redis-adapter");
const { pub, sub } = require("../config/redis");
const { socketAuthMiddleware } = require("../middlewares/auth");
const presence = require("./handlers/presence");
const typing = require("./handlers/typing");
const messages = require("./handlers/messages");

async function initSockets(server, corsOrigin) {
  const io = new Server(server, {
    cors: { origin: corsOrigin, credentials: true }
  });

  io.adapter(createAdapter(pub, sub));
  io.use(socketAuthMiddleware);

  io.on("connection", (socket) => {
    socket.join(`user:${socket.user?.id || socket.handshake.query.id}`);
    presence(io, socket);
    typing(io, socket);
    messages(io, socket);
  });

  return io;
}

module.exports = initSockets;
