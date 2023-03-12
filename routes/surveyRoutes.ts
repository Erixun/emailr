import { Request, Router } from "express";
import mongoose from "mongoose";
import requireCredits from "../middleware/requireCredits.js";
import requireLogin from "../middleware/requireLogin.js";
import Survey from "../models/Survey.js";
import { IUser } from "../models/User.js";
import Mailer from "../services/Mailer.js";
import surveyTemplate from "../services/templates/surveyTemplate.js";

const router = Router();

// Creates a new survey and sends out emails in batch
router.post("/", requireLogin, requireCredits, async (req, res, next) => {
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
  try {
    await mailer.send();
    await survey.save();

    req.user!.credits -= 1;
    const user = await req.user!.save();
    res.send(user);
  } catch (error) {
    return res.status(422).send(error);
  }
});
router.get("/", requireLogin, (req, res, next) => {
  res.send("unfinished route");
});
router.get("/responded", (req, res, next) => {
  res.send("Thanks for voting!");
});

// Webhook route for SendGrid to send data on email clicks
// https://sendgrid.com/docs/for-developers/tracking-events/event/#click-event
router.post("/webhooks", (req, res, next) => {
  console.log(req.body);
  console.log("SendGrid webhook route hit!");
  res.send("unfinished route");
});

//It works like this:
// 1. User clicks on link in email
// 2. SendGrid waits for a bit
// 3. SendGrid sends a POST request to our server with data about
//    all the clicks that happened in the last 30 seconds or so
// 4. We process that data and update our database

export default router;
