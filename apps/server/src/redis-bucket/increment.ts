import { client } from "../redis";

import dotenv from "dotenv";
dotenv.config();


export default async function increment() {

  console.log(global.individuals_tokens)

  const regen_tax = parseInt(process.env.BUCKET_REGENARATE, 10);
  const bucket_limit = parseInt(process.env.BUCKET_SIZE, 10);

  if (global.entities_tokens < bucket_limit) {
    if (regen_tax < bucket_limit - global.entities_tokens) {
      global.entities_tokens += regen_tax;

      await client.hSet("Bucket", "Entities", global.entities_tokens);
    } else {
      global.entities_tokens = bucket_limit;
      await client.hSet("Bucket", "Entities", global.entities_tokens);
    }
  }
  console.log(global.individuals_tokens)

  if (global.individuals_tokens < bucket_limit) {
    if (regen_tax < bucket_limit - global.individuals_tokens) {
      global.individuals_tokens += regen_tax;

      await client.hSet("Bucket", "Individuals", global.individuals_tokens);
    } else {
      global.individuals_tokens = bucket_limit;
      await client.hSet("Bucket", "Individuals", global.individuals_tokens);
    }
  }

  console.log("update redis", global.individuals_tokens);
}
