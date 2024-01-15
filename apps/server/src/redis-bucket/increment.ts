import { client } from "../redis";
import dotenv from "dotenv";
dotenv.config();


export default async function increment() {
  const regen_tax = parseInt(process.env.BUCKET_REGENARATE, 10);
  const bucket_limit = parseInt(process.env.BUCKET_LIMIT, 10);

async function increment_bucket_entities() {
  if (global.entities_tokens < bucket_limit) {
    if (regen_tax < bucket_limit - global.entities_tokens) {
        global.entities_tokens += regen_tax;
      await client.hSet("Bucket", "Individuals", global.individuals_tokens);
    } else {
        global.entities_tokens = bucket_limit;
      await client.hSet("Bucket", "Individuals", global.entities_tokens);
    }
  }
}

async function increment_bucket_indiduals() {
  if (global.individuals_tokens < bucket_limit) {
    if (regen_tax < bucket_limit - global.individual_tokens) {
      global.individual_tokens += regen_tax;
      await client.hSet("Bucket", "Individuals", global.individuals_tokens);
    } else {
      global.individual_tokens = bucket_limit;
      await client.hSet("Bucket", "Individuals", global.individuals_tokens);
    }
  }
}
 
  await increment_bucket_indiduals();
  await increment_bucket_entities();

    console.log("update redis");
    }

