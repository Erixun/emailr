import { Router } from "express";
import { Path } from "path-parser";
import { URL } from "url";
import requireCredits from "../middleware/requireCredits.js";
import requireLogin from "../middleware/requireLogin.js";
import Survey from "../models/Survey.js";
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
router.get("/:surveyId/:response", (req, res, next) => {
  res.send("Thanks for voting!");
});

// Webhook route for SendGrid to send data on email clicks
// https://sendgrid.com/docs/for-developers/tracking-events/event/#click-event
router.post("/webhooks", (req, res, next) => {
  console.log("SendGrid webhook route hit!");
  // URL.
  // path.parse(req.body);
  // console.log(req.body);
  req.body
    .filter(({ event }: { event: string }) => event === "click")
    .map(
      ({
        event,
        url,
        email,
      }: {
        event: string;
        url: string;
        email: string;
      }) => {
        if (event !== "click") return null;
        console.log(url);
        const pathname = new URL(url).pathname;
        const p = new Path("/api/surveys/:surveyId/:choice");
        // const p = path.parse(pathname);
        const { surveyId, choice } = p.test(pathname) || {};
        console.log(p);
        return {
          email: email,
          surveyId: surveyId,
          choice: choice,
        };
      }
    )
    .filter(
      //Filter out duplicate surveyId/email pairs
      (
        { email, surveyId }: { email: string; surveyId: string },
        index: number,
        arr: { email: string; surveyId: string }[]
      ) => {
        return (
          arr.findIndex(
            (e: { email: string; surveyId: string }) =>
              e.email === email && e.surveyId === surveyId
          ) === index
        );
      }
    )
    .forEach(
      ({
        email,
        surveyId,
        choice,
      }: {
        email: string;
        surveyId: string;
        choice: string;
      }) => {
        Survey.updateOne(
          {
            _id: surveyId, //_id is the mongo id
            recipients: {
              // $ is a mongo operator, $elemMatch is a suboperator
              // filter recipients with matching email and responded: false
              $elemMatch: { email: email, responded: false },
            },
          },
          {
            //count of yes/no responses
            $inc: { [choice]: 1 },
            //update the recipient's responded field to true
            $set: { "recipients.$.responded": true },
            // lastResponded: new Date(),
          }
        ).exec();
      }
    );

  res.send("unfinished route");
});

//It works like this:
// 1. User clicks on link in email
// 2. SendGrid waits for a bit
// 3. SendGrid sends a POST request to our server with data about
//    all the clicks that happened in the last 30 seconds or so
// 4. We process that data and update our database

export default router;
