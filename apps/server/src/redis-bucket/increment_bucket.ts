import { client } from "../redis";
import dotenv from "dotenv";
dotenv.config();

export default async function increment_bucket() {
  const total_Individuals = global.individuals_tokens;
  const total_Entities = global.entities_tokens;
  const bucket_limit = parseInt(process.env.BUCKET_LIMIT, 10);
  const individuals = parseInt(total_Individuals, 10);
  const entities = parseInt(total_Entities, 10);
  const regen_tax = parseInt(process.env.BUCKET_REGENARATE, 10);

  async function update_individuals(tokens) {
    global.individuals_tokens = tokens;
    await client.hSet("Bucket", "Individuals", global.individuals_tokens);
  }

  async function update_entities(tokens) {
    global.entities_tokens = tokens;
    await client.hSet("Bucket", "Entities", global.entities_tokens);
  }

  if (total_Individuals && total_Entities !== undefined) {
    if (individuals < bucket_limit) {
      if (regen_tax > bucket_limit - individuals) {
        update_individuals(bucket_limit);
      } else {
        global.individuals_tokens += regen_tax;
        update_individuals(global.individuals_tokens);
      }
    }

    if (entities < bucket_limit) {
      if (regen_tax > bucket_limit - entities) {
        update_entities(bucket_limit);
      } else {
      global.entities_tokens += regen_tax
      update_entities( global.entities_tokens);
    }

    console.log("update redis");
    }
  }
}

