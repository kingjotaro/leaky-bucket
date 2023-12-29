import dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config();

const createRedisClient = () => {
  const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT, 10),
    },
  });

  client.on("error", (err) => {
    console.error(`Error on Redis conection: ${err}`);
  });

  return client;
};
export const client = createRedisClient();
