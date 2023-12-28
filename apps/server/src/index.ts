import Koa, { ParameterizedContext } from "koa";
import Router from "koa-router";
import { client } from "./redis";
import createkey from "./routes/create_key";
import verifykey from "./routes/verify_key";
import get from "./routes/query_celcoin";
import getrandom from "./routes/query_celcoin_random";
import schedule from 'node-schedule';
import increment_bucket from './redis-bucket/bucket_schedule'

const app = new Koa();
const router = new Router();

router.get("/", async (ctx: ParameterizedContext) => {
  ctx.body = await client.keys("*");
});
app.use(get.routes());
app.use(getrandom.routes());
app.use(verifykey.routes());
app.use(createkey.routes());
app.use(router.routes());
app.use(router.allowedMethods());



const job = schedule.scheduleJob('0 * * * *', () => {
  increment_bucket();
});
console.log('Job ongoing...');


const start = async () => {
  await client.connect();
  if (process.env.NODE_ENV !== 'test') {
    app.listen(3000, () => {
      console.log("App listening on port 3000");
    });
  }
 
  const keyExists = await client.get("createkey");
  if (keyExists !== null) {
    global.celcoinkey = keyExists;
  }
};
start();

export { app };
