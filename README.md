💬 ChatBus Live Chat

Real-time business live chat system with agents ↔ customers, built using Node.js, Socket.IO, Redis, and PostgreSQL.
Supports presence (online/offline), typing indicators, and messaging in real time.

 Features

 Agent ↔ Customer chat (supports multiple roles)

 Presence tracking (online/offline & last seen)

 Typing indicators

 Postgres persistence for users/messages

 Redis Pub/Sub for horizontal scaling

 JWT authentication (with guest fallback for testing)

 Tech Stack

Backend: Node.js, Express

Realtime: Socket.IO + Redis Adapter

Database: PostgreSQL + Sequelize

Auth: JWT (optional for guests)

 Setup
# clone the repo
git clone https://github.com/yourusername/chatbus.git
cd chatbus

# install dependencies
npm install

# configure environment
cp .env.example .env

# run in dev mode
npm run dev

Environment Variables
Variable	Description	Default
PORT	App port	3000
REDIS_URL	Redis connection string	redis://localhost:6379
DB_USERNAME	Postgres username	
DB_PASSWORD	Postgres password	
DB_NAME	Postgres database name	chatBus
DB_HOST	Postgres host	127.0.0.1
JWT_SECRET	JWT secret for auth	(set one)
CORS_ORIGIN	Allowed client origin	http://localhost:3000
Development Test Page

A simple test UI is included to simulate customer & agent chat.
Just open in the browser:

http://localhost:3000

