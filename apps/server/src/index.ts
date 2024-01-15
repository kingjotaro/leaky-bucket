import Koa, { ParameterizedContext } from "koa";
import Router from "koa-router";
import { client } from "./redis";
import createkey from "./routes/create_key";
import verifykey from "./routes/verify_key";
import get from "./routes/query_celcoin";
import getrandom from "./routes/query_celcoin_random";
import schedule from "node-schedule";
import increment from "./redis-bucket/increment";
import cors from "koa2-cors";
import bucket_update from "./redis-bucket/bucket_update";
import ratelimit from "koa-ratelimit";
import dotenv from "dotenv";

dotenv.config();

const app = new Koa();
const router = new Router();

router.get("/", async (ctx: ParameterizedContext) => {
  ctx.body = await client.keys("*");
});

const db = new Map();

app.use(async function (ctx, next) {
  await ratelimit({
    driver: "memory",
    db: db,
    duration: process.env.NODE_FLAG2,
    max: process.env.NODE_FLAG,
    errorMessage: "Too many requests, slow down bro2!",
    errorStatus: 429,
  })(ctx, next);

  if (ctx.status === 429) {
    console.log(ctx.body);
  }
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(get.routes());
app.use(getrandom.routes());
app.use(verifykey.routes());
app.use(createkey.routes());
app.use(router.routes());
app.use(router.allowedMethods());

const job = schedule.scheduleJob(process.env.TICKET_REGENERATE, () => {
  increment();
});
console.log("Job ongoing...");

const job2 = schedule.scheduleJob("*/10 * * * * *", () => {
  bucket_update();
});
console.log("Job 2 ongoing too...");

const start = async () => {
  await client.connect();
  if (process.env.NODE_ENV !== "test") {
    app.listen(3000, () => {
      console.log("App listening on port 3000");
    });
  }
  const valueEntities = await client.hGet("Bucket", "Entities");
  if (valueEntities !== null) {
    global.entities_tokens = parseInt(valueEntities, 10);
  }
  //gambiarra das braba
  global.individuals_tokens = parseInt(process.env.BUCKET_SIZE, 10);

  const keyExists = await client.get("createkey");
  if (keyExists !== null) {
    global.celcoinkey = keyExists;
  }
};
start();

export { app };
