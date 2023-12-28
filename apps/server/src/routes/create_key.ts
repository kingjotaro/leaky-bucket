import { ParameterizedContext } from "koa";
import Router from "koa-router";
import { client } from "../redis";
import { getToken } from "../utils/api_celcoin";

const router = new Router();

router.get("/createkey", async (ctx: ParameterizedContext) => {
  const tokenData = await getToken();
  global.celcoinkey = tokenData.access_token;
  await client.set("createkey", tokenData.access_token, { EX: 2399 });
  ctx.body = "Key created";
  console.log("Key created");
  console.log(global.celcoinkey);
});

export default router;
