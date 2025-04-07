import { Redis } from "ioredis";
import dotenv from 'dotenv';
dotenv.config();

export const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_KEY,
  tls: {}
});

redis.set("message", "Redis connected");
redis.get("message").then(console.log);

