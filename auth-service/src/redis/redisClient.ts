import { Redis } from "ioredis";
const redisURL = "rediss://red-cs3sj30gph6c73c7cbcg:DUcIdc3zCOpygCvfGYNa8Si2dW1AKTwW@oregon-redis.render.com:6379";
export const Client = new Redis(redisURL);

Client.on("connect", () => {
  console.log("💡redis connected successfully.....");
});

Client.on("error", (err) => {
  console.error("Redis connection error:", err);
});