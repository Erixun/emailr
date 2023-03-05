import { Router } from "express";
import requireCredits from "../middleware/requireCredits.js";
import requireLogin from "../middleware/requireLogin.js";
import Survey from "../models/Survey.js";
import Mailer from "../services/Mailer.js";
import surveyTemplate from "../services/templates/surveyTemplate.js";

const router = Router();
// Creates a new survey and sends out emails in batch
router.post("/", requireLogin, requireCredits, (req, res, next) => {
  const { title, subject, body, recipients } = req.body;

  //Survey instance
  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients
      .split(",")
      .map((email: string) => ({ email: email.trim() })),
    _user: req.user?.id,
    dateSent: Date.now(),
  });

  // Great place to send an email! (WIP)
  const mailer = new Mailer(survey, surveyTemplate(survey));
  mailer.send();
  //Email template

  // Mailer - Sendgrid scans each email,
  //          replacing every link with their own.
  // They know the recipient of every email and links injected
  // into an email contains a token to identify the user.

  //Link-click effect:
  // 1. User gets sent to their destination.
  // 2. Sendgrid sends msg to our server informing us of the click.

  res.send("unfinished route");
});
router.get("/api/surveys", requireLogin, (req, res, next) => {
  res.send("unfinished route");
});
router.post("/api/surveys/webhooks", (req, res, next) => {
  res.send("unfinished route");
});

export default router;