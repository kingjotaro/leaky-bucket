import { ParameterizedContext } from "koa";
import Router from "koa-router";
import { client } from "../redis";
import { getQuery } from "../utils/query";
import verify_tokens from "../redis-bucket/verify_tokens";
import dotenv from "dotenv";

dotenv.config();
const router = new Router();



router.get("/get/:cpfOrCnpj", async (ctx: ParameterizedContext) => {
    try {
    const cpfOrCnpj = ctx.params.cpfOrCnpj;
    const key = await client.exists(cpfOrCnpj);
    if (key === 1) {
      const existkey = await client.get(cpfOrCnpj);
      ctx.body = JSON.parse(existkey);
      console.log("Sucessfull:", 200);
    } else if ((await verify_tokens(cpfOrCnpj)) === true) {
      await getQuery(cpfOrCnpj, ctx);
    } else {
      ctx.status = 429;
      console.error("Too Many Requests - Bucket is empty.");
      ctx.body = "Too Many Requests - Bucket is empty.";
    }
  } catch (error) {
    console.error("An error occurred:", error);
    if (error.status === 429) {
      console.log("Rate limit exceeded:", error.message);
    }
    ctx.status = error.status || 500;
    ctx.body = error.message || "Internal Server Error";
}

}
);

export default router;
