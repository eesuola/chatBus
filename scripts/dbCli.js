
const readline = require("readline");
const { sequelize, Conversation, Message, User } = require("../src/models");

// Setup prompt
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "db> "
});

console.log("✅ Connected to Postgres through Sequelize.");
console.log("Type raw SQL or use shortcuts (:convos, :msgs <id>, :users). Type \\q to exit.");
rl.prompt();

rl.on("line", async (line) => {
  const input = line.trim();
  if (input === "\\q") {
    rl.close();
    return;
  }

  try {
    // 🔹 Shortcuts for your chat app
    if (input === ":convos") {
      const convos = await Conversation.findAll({ order: [["updatedAt", "DESC"]], limit: 10 });
      console.table(convos.map(c => c.toJSON()));
    } else if (input.startsWith(":msgs")) {
      const parts = input.split(" ");
      const convoId = parts[1];
      if (!convoId) {
        console.log("Usage: :msgs <conversationId>");
      } else {
        const msgs = await Message.findAll({ where: { conversationId: convoId }, order: [["createdAt", "ASC"]], limit: 20 });
        console.table(msgs.map(m => m.toJSON()));
      }
    } else if (input === ":users") {
      const users = await User.findAll({ limit: 10 });
      console.table(users.map(u => u.toJSON()));
    } else {
      // 🔹 Run as raw SQL
      const [rows] = await sequelize.query(input);
      console.table(rows);
    }
  } catch (err) {
    console.error("❌ Error:", err.message);
  }

  rl.prompt();
}).on("close", () => {
  console.log("👋 Exiting DB CLI.");
  process.exit(0);
});
