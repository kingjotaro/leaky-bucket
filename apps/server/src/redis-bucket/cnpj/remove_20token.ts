export default async function remove_20token_cnpj() {
  if (global.entities_tokens > 0) {
    global.entities_tokens = global.entities_tokens - 20;
  } else {
    console.error("Bucket size is less than 1.");
  }
}