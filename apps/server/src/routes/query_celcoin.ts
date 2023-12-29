import { ParameterizedContext } from "koa";
import Router from "koa-router";
import { client } from "../redis";
import { getQuery } from "../utils/query";
import verify_tokens from "../redis-bucket/verify_tokens";

const router = new Router();

router.get("/get/:cpfOrCnpj", async (ctx: ParameterizedContext) => {

  const cpfOrCnpj = ctx.params.cpfOrCnpj;
  const key = await client.exists(cpfOrCnpj);
  if (key === 1) {
    const existkey = await client.get(cpfOrCnpj);
    ctx.body = JSON.parse(existkey);
    console.log("Sucessfull:", 200);
  } else if ((await verify_tokens(cpfOrCnpj)) === true) {
    await getQuery(cpfOrCnpj, ctx);
  } else {
    console.error("Bucket is empty.");
    ctx.body = "Bucket is empty.";
  }
});

export default router;
