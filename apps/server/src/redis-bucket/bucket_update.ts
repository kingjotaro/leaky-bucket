import { client } from "../redis";

export default async function bucket_update() {

      const new_Individuals = global.individuals_tokens
      await client.hSet("Bucket", "Individuals", new_Individuals);

      const new_Entities = global.entities_tokens
      await client.hSet("Bucket", "Entities", new_Entities);

      console.log("sync redis bucket")
}
