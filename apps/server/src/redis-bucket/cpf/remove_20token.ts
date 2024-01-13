export default async function remove_20token_cpf() {
  if (global.individuals_tokens > 0) {
    global.individuals_tokens = global.individuals_tokens - 20;
  } else {
    console.error("Bucket size is less than 1.");
  }
}
