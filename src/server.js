const http = require("http");
const app = require("./app");
const { port, corsOrigin } = require("./config/env");
const { sequelize } = require("../config/config.js");
const initSockets = require("./sockets");

(async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.sync(); // for dev; in prod use migrations
    const server = http.createServer(app);
    await initSockets(server, corsOrigin);
    server.listen(port, () => console.log(`LiveChat (JS) running on :${port}`));
  } catch (e) {
    console.error("Startup failed:", e);
    process.exit(1);
  }
})();
