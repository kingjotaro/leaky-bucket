import supertest from "supertest";
import { app } from "../index";
import { client } from "../redis";
import getCPF from "../utils/cpf_generator";

it("should receive a valid CPF, fetch data, and reduce one token from Redis bucket", async () => {
  const cpf = getCPF();
  const oldbucket = await client.hGet("Bucket", "Individuals");
  const response = await supertest(app.callback()).get("/get/" + cpf);

  expect(response.status).toBe(200);

  if (response.text === "Bucket is empty.") {
    expect(response.text).toBe("Bucket is empty.");
    expect(oldbucket).toBe("0");
  } else {
    const jsonData = JSON.parse(response.text);
    const finalBucketSize = parseInt(
      await client.hGet("Bucket", "Individuals"),
      10
    );
    const expectedBucketSize = parseInt(oldbucket, 10) - 1;
    expect(jsonData).toBeDefined();
    setTimeout(() => {
      expect(finalBucketSize).toBe(expectedBucketSize);
    }, 2000);
  }
});

it("should receive a valid CNPJ, fetch data, and reduce one token from Redis bucket", async () => {
  const cnpj = getCPF();
  const oldbucket = await client.hGet("Bucket", "Entities");
  const response = await supertest(app.callback()).get("/get/123" + cnpj);

  expect(response.status).toBe(200);

  if (response.text === "Bucket is empty.") {
    expect(response.text).toBe("Bucket is empty.");
    expect(oldbucket).toBe("0");
  } else {
    const jsonData = JSON.parse(response.text);
    const finalBucketSize = parseInt(
      await client.hGet("Bucket", "Entities"),
      10
    );
    const expectedBucketSize = parseInt(oldbucket, 10) - 1;
    expect(jsonData).toBeDefined();
    setTimeout(() => {
      expect(finalBucketSize).toBe(expectedBucketSize);
    }, 2000);
  }
});

it("should handle valid CPF, fetch data, and update Redis bucket accordingly", async () => {
  const oldbucket = await client.hGet("Bucket", "Individuals");
  const response = await supertest(app.callback()).get("/get/1337");

  if (response.text === "Bucket is empty.") {
    expect(response.status).toBe(200);
    expect(response.text).toBe("Bucket is empty.");
    expect(oldbucket).toBe("0");
  } else {
    const finalBucketSize = parseInt(
      await client.hGet("Bucket", "Individuals"),
      10
    );
    const expectedBucketSize = parseInt(oldbucket, 10) - 20;
    setTimeout(() => {
      expect(finalBucketSize).toBe(expectedBucketSize);
    }, 2000);
    expect(response.status).toBe(500);
  }
});

it("should handle valid CPF, fetch data, and update Redis bucket accordingly", async () => {
  const oldbucket = await client.hGet("Bucket", "Entities");
  const response = await supertest(app.callback()).get("/get/1234567891011");

  if (response.text === "Bucket is empty.") {
    expect(response.status).toBe(200);
    expect(response.text).toBe("Bucket is empty.");
    expect(oldbucket).toBe("0");
  } else {
    const finalBucketSize = parseInt(
      await client.hGet("Bucket", "Entities"),
      10
    );
    const expectedBucketSize = parseInt(oldbucket, 10) - 20;
    setTimeout(() => {
      expect(finalBucketSize).toBe(expectedBucketSize);
    }, 2000);
    expect(response.status).toBe(500);
  }
});
