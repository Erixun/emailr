import { Request, Router } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import requireLogin from "../middleware/requireLogin.js";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SK || "STRIPE_SK", {
  apiVersion: "2022-11-15",
});
const router = Router();

router.post("/", requireLogin, async (req, res, next) => {
  const charge = await stripe.charges.create({
    amount: 500,
    currency: "usd",
    description: "$5 for 5 credits",
    source: req.body.id,
  });

  req.user!.credits += 5;
  //@ts-ignore
  const user = await req.user.save();
  return res.send(user);
});

export default router;
