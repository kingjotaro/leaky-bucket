const sdk = require("api")("@celcoin/v2.0.0#f8x08j3jl09moiie");
import dotenv from "dotenv";

dotenv.config();

export const getToken = async () => {
  try {
    const response = await sdk.postV5Token({
      client_id: process.env.CELCOIN_CLIENT_ID,
      client_secret: process.env.CELCOIN_CLIENT_SECRET,
      grant_type: process.env.CELCOIN_GRANT_TYPE,
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};
