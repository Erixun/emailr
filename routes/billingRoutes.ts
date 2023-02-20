import { Router } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
//@ts-ignore
import { STRIPE_SK } from "../config/keys.js";
// const stripeSecretKey = process.env.STRIPE_SK;
// // if (!stripeSecretKey) throw new Error("key undefined");
// console.log(STRIPE_SK);
//TODO: fix ERRRORRRRRRR on connect
const stripe = new Stripe(process.env.STRIPE_SK || "STRIPE_SK", {
  apiVersion: "2022-11-15",
});
const router = Router();

router.post("/", (req, res, next) => {
  //TODO: use stripe API wrapper
  console.log(req.body);
});

export default router;
