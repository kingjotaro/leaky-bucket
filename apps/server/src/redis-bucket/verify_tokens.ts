export default async function verify_tokens(
  cpfOrCnpj: string
): Promise<boolean> {
  const isCnpj = cpfOrCnpj.length > 11;
  const totalBucket = isCnpj ? global.entities_tokens : global.individuals_tokens;
  return totalBucket > 0;
}
