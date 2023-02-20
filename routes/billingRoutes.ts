import { Router } from "express";
import Stripe from "stripe";
const stripeSecretKey = process.env.STRIPE_SK;
if (!stripeSecretKey) throw new Error("key undefined");

const stripe = new Stripe(process.env.STRIPE_SK as string, {
  apiVersion: "2022-11-15",
});
const router = Router();

router.post("/api/stripe", (req, res, next) => {
  //TODO: use stripe API wrapper
  console.log(req);
});

export default router;
