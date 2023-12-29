import { client } from "../../redis";

export default async function remove_1token_cpf() {
  const totalBucket = await client.hGet("Bucket", "Individuals");

  if (totalBucket !== undefined) {
    const bucket = parseInt(totalBucket, 10);

    if (bucket > 0) {
      const newBucket = bucket - 1;
      await client.hSet("Bucket", "Individuals", newBucket);
    } else {
      console.error("Bucket is empty.");
    }
  } else {
    console.error("Total bucket is undefined.");
  }
}
