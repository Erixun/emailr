import { Router } from "express";
import mongoose from "mongoose";
import requireCredits from "../middleware/requireCredits.js";
import requireLogin from "../middleware/requireLogin.js";
import { SurveyModel } from "../models/Survey.js";

const router = Router();
const Survey = mongoose.model<SurveyModel>("surveys>");
router.post("/api/surveys", requireLogin, requireCredits, (req, res, next) => {
  const { title, subject, body, recipient } = req.body;

  const survey = new Survey({
    title,
    subject,
    body,
  });
  res.send("unfinished route");
});
router.get("/api/surveys", requireLogin, (req, res, next) => {
  res.send("unfinished route");
});
router.post("/api/surveys/webhooks", (req, res, next) => {
  res.send("unfinished route");
});

export default router;
