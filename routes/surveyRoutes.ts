import { Router } from "express";
import mongoose from "mongoose";
import requireCredits from "../middleware/requireCredits.js";
import requireLogin from "../middleware/requireLogin.js";
import { SurveyModel } from "../models/Survey.js";

const router = Router();
const Survey = mongoose.model<SurveyModel>("surveys");
// Creates a new survey and sends out emails in batch
router.post("/api/surveys", requireLogin, requireCredits, (req, res, next) => {
  const { title, subject, body, recipient } = req.body;

  //Survey instance
  const survey = new Survey({
    title,
    subject,
    body,
    recipient: recipient
      .split(",")
      .map((email: string) => ({ email: email.trim() })),
    _user: req.user?.id,
    dateSent: Date.now(),
  });

  //Email template

  // Mailer - Sendgrid scans each email,
  //          replacing every link with their own.
  // They know the recipient of every email and links injected
  // into an email contains a token to identify the user.

  //Link-click effect:
  // 1. User gets sent to their destination.
  // 2. Sendgrid sends msg to our server informing us of the click.

  //Emailr-key: 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
  res.send("unfinished route");
});
router.get("/api/surveys", requireLogin, (req, res, next) => {
  res.send("unfinished route");
});
router.post("/api/surveys/webhooks", (req, res, next) => {
  res.send("unfinished route");
});

export default router;
