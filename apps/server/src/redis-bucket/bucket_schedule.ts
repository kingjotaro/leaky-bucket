import { client } from "../redis";

export default async function increment_bucket() {
  const total_Individuals = await client.hGet("Bucket", "Individuals");
  const total_Entities = await client.hGet("Bucket", "Entities");
  let individuals = parseInt(total_Individuals, 10)
  let entities = parseInt(total_Entities, 10)


  if (total_Individuals && total_Entities !== undefined) {
    if (individuals < 99) {
      const new_Individuals = parseInt(total_Individuals, 10) + 2;
      await client.hSet("Bucket", "Individuals", new_Individuals);
    }

    if (entities < 999) {
      const new_Entities = parseInt(total_Entities, 10) + 2;
      await client.hSet("Bucket", "Entities", new_Entities);
    }

    console.log("update redis");
  }
}
