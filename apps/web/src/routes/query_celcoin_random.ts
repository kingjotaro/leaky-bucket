import fetch from "node-fetch";
import { ParameterizedContext } from "koa";
import Router from "koa-router";
import getCPF from "../utils/cpf_generator";

const router = new Router();

router.get("/getrandom", async (ctx: ParameterizedContext) => {
  const url = "https://sandbox.openfinance.celcoin.dev/pix/v1/dict/v2/key";
  const cpf = getCPF();
  const payload = {
    key: cpf,
    payerId: cpf,
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
    ctx.status = 200;
    ctx.body = responseData;
  } catch (error) {
    console.error(error.message);
    ctx.status = 500;
    ctx.body = "Internal Server Error";
  }
});

export default router;
