import { client } from "../redis";

export default async function verify_tokens(
  cpfOrCnpj: string
): Promise<boolean> {
  const isCnpj = cpfOrCnpj.length > 11;
  const bucketKey = isCnpj ? "Entities" : "Individuals";
  const totalBucket = await client.hGet("Bucket", bucketKey);
  return totalBucket !== undefined && parseInt(totalBucket, 10) > 0;
}
