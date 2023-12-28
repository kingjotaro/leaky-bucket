import { client } from "../../redis";

export default async function remove_1token_cnpj() {
  const totalBucket = await client.hGet("Bucket", "Entities");

  if (totalBucket !== undefined) {
    const bucket = parseInt(totalBucket, 10);

    if (bucket > 0) {
      const newBucket = bucket - 1;
      await client.hSet("Bucket", "Entities", newBucket);
    } else {
      console.error("Bucket size is less than 1.");
    }
  } else {
    console.error("Total bucket is undefined.");
  }
}
