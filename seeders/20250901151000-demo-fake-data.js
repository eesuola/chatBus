"use strict";

const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    // 🔹 Create fake users
    const users = [];
    for (let i = 0; i < 20; i++) {
      users.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        role: i % 2 === 0 ? "agent" : "customer",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert("Users", users);

    // 🔹 Create fake conversations
    const conversations = [];
    for (let i = 0; i < 10; i++) {
      conversations.push({
        status: i % 2 === 0 ? "open" : "closed",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert("Conversations", conversations);

    // 🔹 Create fake messages
    const messages = [];
    for (let i = 0; i < 50; i++) {
      messages.push({
        text: faker.lorem.sentence(),
        senderRole: i % 2 === 0 ? "agent" : "customer",
        senderId: faker.number.int({ min: 1, max: users.length }), // random user
        conversationId: faker.number.int({ min: 1, max: conversations.length }),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert("Messages", messages);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Messages", null, {});
    await queryInterface.bulkDelete("Conversations", null, {});
    await queryInterface.bulkDelete("Users", null, {});
  },
};
