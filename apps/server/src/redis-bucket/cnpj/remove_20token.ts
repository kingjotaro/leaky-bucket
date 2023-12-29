import { client } from "../../redis";


export default async function remove_20token_cnpj() {
  const totalBucket = await client.hGet("Bucket", "Entities");
  
  if (totalBucket === undefined) {
    console.error("Total bucket is undefined.");
    return;
  }

  const bucket = parseInt(totalBucket, 10);

  if (bucket > 19) {
    const newBucket = bucket - 20;
    await client.hSet("Bucket", "Entities", newBucket);
  } else {
    const newBucket = 0;
    await client.hSet("Bucket", "Entities", newBucket);
  }
}
