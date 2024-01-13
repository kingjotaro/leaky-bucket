export default async function remove_1token_cnpj() {
  

    if (global.entities_tokens > 0) {
      global.entities_tokens = global.entities_tokens - 1;
    } else {
      console.error("Bucket size is less than 1.");
    }
}
  

