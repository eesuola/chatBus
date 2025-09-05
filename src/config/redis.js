// src/config/redis.js
const Redis = require("ioredis");
const { redisUrl } = require("./env");

const pub = new Redis(redisUrl);
const sub = new Redis(redisUrl);
const redis = new Redis(redisUrl);

pub.on("error", (err) => console.error(" Redis Pub Error", err));
sub.on("error", (err) => console.error(" Redis Sub Error", err));
redis.on("error", (err) => console.error(" Redis Client Error", err));

module.exports = { pub, sub, redis };
