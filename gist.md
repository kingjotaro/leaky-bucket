# Test Plan - Leaky Bucket Algorithm with Node and Redis

<div align="center">
Author: Rafael Lourenço

## TABLE OF CONTENTS
</div>

 1.0 INTRODUCTION

2.0 FUNCTIONALITY

3.0 DESIGN

4.0 TEST

5.0 RULES AND EXAMPLES



<h2 align="center">
  <strong>1.0 INTRODUCTION</strong>
</h2>


This documentation is a  test plan  of the Leaky Bucket algorithm that I created in this repository with Node and Redis.

The objective of this is to provide some concepts on how we can implement the Leaky Bucket algorithm with Node.js and Redis and demonstrate its functionality.

<h2 align="center">
  <strong>2.0 FUNCTIONALITY</strong>
</h2>


We have 5 endpoints  

1. GET **“/”** - Retrieve all keys in Redis. This is the simplest endpoint. If we don't have any data, we will retrieve, at least, the hash bucket key. This key is used to save tokens and our bucket.

2. GET **“/createkey”** - Generate and store a Celcoin key in Redis for 40 minutes. After 40 minutes, the key expires and is deleted from Redis

3. GET **“/verifykey”** - Verify the existence of a key in Redis and redirect to /createkey if not found.

4. GET **“/getrandom”** - Generate a random CPF number, query the Celcoin API, retrieve the data, and save it into Redis as well.

5. GET **“/get/{CPForCNPJ}”** - Search for a CPF or CNPJ in Redis, query Celcoin API if not found

The Leaky Bucket algorithm only counts the endpoint number 5; all the other endpoints are designed to assist the usage of endpoint number 5. This implies that our tokens from the bucket should only update when we use endpoint number 5. However, there is an exception for the update: the passage of time. When time passes, the bucket should restore a few quantities of tokens. For this, we are using a cron job to update Redis.


<h2 align="center">
  <strong>3.0 DESIGN</strong>
</h2>

All queries will hit Redis to check if the information already exists in memory. If the information is present in memory, we retrieve the answer. If not, we need to verify if there are tokens in our bucket to make a query to the Celcoin API, a third-party API that will provide the answer. After obtaining the response, we return it to the client and save it in Redis. If our bucket is empty, we refrain from calling the Celcoin API and respond with a rate limit.

Our tokens in this implementation are stored in the server's memory. However, we have information on Redis with the number of tokens we still have to use.

![design](https://res.cloudinary.com/practicaldev/image/fetch/s--ATr29Qgv--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/txvm68kivusmrab1qc04.png)





To test , we utilized Jest with SuperTest. However, these tests primarily focused on individual requests, offering a limited assessment of the application's performance. Now, we're planning to execute scripts with numerous requests and diversification to observe the system's behavior.

Scenario 1:
The first script is pretty simple; it's going to make 1000 valid cpf requests almost simultaneously.

| Scenario    | Reset limit | Req limit |
|-------------|-------------|-----------|
| A           | 1 min       | 1000      |
| B           | 1 min       | 100       |

<h2 align="center">
  <strong>4.0 TEST</strong>
</h2>


Script A: In the initial scenario, we should have 1000 tokens in the Individuals bucket. To execute this, use turbo dev, which will set our rate limit to 1000 requests per minute. Run the script using ./1000_valid_req.sh, or go to the 'Scripts' folder inside the server app and execute it with ts-node. All requests should successfully pass and return a status code of 200. Additionally, all data should be stored in Redis, and all tokens should be removed.

Script B: In this scenario, we're going to reset our tokens to 1000 and change the rate limit to 100 requests per minute. The first 100 requests should pass and be stored in Redis, while the remaining 900 request should time out. To execute this, use turbo dev1 and run the same request script with ./1000_valid_red.sh

	
Scenario 2:
This second script has a timeout of 0.3 seconds per request using CPF.



| Scenario    | Token generate time | Token generate | Bucket size |
|-------------|----------------------|-----------------|-------------|
| A           | 10s                  | 2               | 50         |
| B           | 20s                  | 3               | 50         |



Script A: In this scenario we have 50 tokens that regenerate every 10 seconds, adding 2 tokens in each regeneration cycle, and it can be executed by running the command turbo dev1. Access is available through the front-end page by clicking the 'Make API Calls' button. After making the call, it is expected that a graph with success and failed attempts will be displayed once all requests are completed.

Script B: In this scenario we have 50 tokens that regenerate every 20 seconds, adding 3 tokens in each regeneration cycle, and it can be executed by running the command turbo dev2. Access is available through the front-end page by clicking the 'Make API Calls' button. After making the call, it is expected that a graph with success and failed attempts will be displayed once all requests are completed.

Note: you can choose how many requests you can make in both scripts in the web interface.

Hera a list of flags that can be modified in the package json to setting diferents setups of use 


* BUCKET_SIZE: Size of the Bucket.

* FREQUENCY_BUCKET: Frequency of Bucket Regeneration.

* BUCKET_REGENERATE: Quantity of regenerated buckets.

* MAX_REQ_RATE: Maximum number of requests under the rate limit.

* LIMIT_RATE_RESET: Number of requests reset at the rate limit.


<h2 align="center">
  <strong>5.0 RULES AND EXAMPLES </strong>
</h2>

There are a few general rules for this project:

- If the data exists in Redis, the query will not consume any tokens from the bucket.

- For a successful query, one token will be deducted from the bucket.

- If the query is of an incorrect type, meaning it is not a valid CPF or CNPJ, 20 tokens will be deducted from the bucket.

- If the query script hits the rate limit of the API on the web, it will be stopped.

- If the bucket has no tokens and the data doesn't exist in Redis, the query will not be processed.

- You can choose the quantity and time for token regeneration in the bucket.


Example: 


Runing Scenario 2 - Script A:

    FREQUENCY_BUCKET= 10s 
    BUCKET_REGENARATE= 2 
    BUCKET_SIZE= 50 
    MAX_REQ_RATE= 1000
    LIMITE_RATE_CD= 1 min 


Making 100 requests will return a little more than 50, as we are going to regenerate 2 tokens every 10 seconds. The graph will look like that, and you can get different values based on how fast your hardware is.


![teste](https://res.cloudinary.com/practicaldev/image/fetch/s--PCUPgynt--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/sdn36eiomfqc6d1ai2z5.png)

