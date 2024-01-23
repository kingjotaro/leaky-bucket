import { ParameterizedContext } from "koa";
import fetch from "node-fetch";
import { client } from "../redis";
import remove_20token_cnpj from "../redis-bucket/cnpj/remove_20token";
import remove_20token_cpf from "../redis-bucket/cpf/remove_20token";
import remove_1token_cnpj from "../redis-bucket/cnpj/remove_1token";
import remove_1token_cpf from "../redis-bucket/cpf/remove_1token";

export const getQuery = async (
  cpfOrCnpj: string,
  ctx: ParameterizedContext
) => {
  const url = "https://sandbox.openfinance.celcoin.dev/pix/v1/dict/v2/key";

  const payload = {
    key: cpfOrCnpj,
    payerId: cpfOrCnpj,
  };

  const headers = {
    accept: "application/json",
    "content-type": "application/json",
    authorization: `Bearer ${global.celcoinkey}`,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();
    const status = response.status;
    if (status === 200) {
      await client.set(cpfOrCnpj, JSON.stringify(responseData));
      console.log("Sucessfull:", status);
      ctx.status = 200;
      ctx.body = responseData;

      if (cpfOrCnpj.length <= 11) {
        await remove_1token_cpf();
        console.log("cpf");
        console.log(global.individuals_tokens);
      } else {
        await remove_1token_cnpj();
        console.log("cnpj");
        console.log(global.entities_tokens);
      }
    }
    if (status === 400) {
      if (cpfOrCnpj.length > 11) {
        await remove_20token_cnpj();
      } else {
        await remove_20token_cpf();
      }
      throw new Error("Bad request, not find any data");
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    ctx.status = 500;
    ctx.body = "Bad request, not find any data";
  }
};
