import { client } from "../redis";
import dotenv from "dotenv";
dotenv.config();

export default async function increment_bucket() {

  const total_Individuals = await client.hGet("Bucket", "Individuals");
  const total_Entities = await client.hGet("Bucket", "Entities");
  const bucket_limit = parseInt(process.env.BUCKET_LIMIT, 10)
  let individuals = parseInt(total_Individuals, 10)
  let entities = parseInt(total_Entities, 10)
  

  if (total_Individuals && total_Entities !== undefined) {
    if (individuals < bucket_limit) {
      const new_Individuals = parseInt(total_Individuals, 10) + process.env.BUCKET_REGENARATE;
      await client.hSet("Bucket", "Individuals", new_Individuals);
    }

    if (entities < bucket_limit) {
      const new_Entities = parseInt(total_Entities, 10) + process.env.BUCKET_REGENARATE;
      await client.hSet("Bucket", "Entities", new_Entities);
    }

    console.log("update redis");
  }
}
