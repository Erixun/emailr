import * as dotenv from "dotenv";
dotenv.config();
import { env } from "process";
// import * as dev from "./dev.js";
// import * as prod from "./prod.js";

const isProd = process.env.NODE_ENV === "production";
// if (process.env.NODE_ENV === "production") {
//   //return prod keys
//   module.exports = dev;
// } else {
//   //return dev keys
//   module.exports = prod;
// }
// export const keys = isProd ? prod : dev;

export const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  MONGO_URI,
  COOKIE_KEY,
  STRIPE_PK,
  STRIPE_SK,
  SEND_GRID_KEY,
  REDIRECT_DOMAIN,
} = env;
