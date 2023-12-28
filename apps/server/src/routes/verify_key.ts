import { ParameterizedContext } from "koa";
import Router from "koa-router";
import { client } from "../redis";

const router = new Router();

router.get("/verifykey", async (ctx: ParameterizedContext) => {
  const keyExists = await client.exists("createkey");

  if (keyExists === 0) {
    ctx.body = "Key not found, redirecting you to create key!";
    console.log("Key not found, redirecting you to create key!")

    setTimeout(() => {
      ctx.redirect("/createkey");
    }, 2000);
  }

  ctx.body = "Key verification successful.";
  console.log("Key verification successful.");
});

export default router;
