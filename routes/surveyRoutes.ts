import { Router } from "express";

const router = Router();

router.get("/api/surveys", (req, res, next) => {
  res.send("unfinished route");
});
router.post("/api/surveys/webhooks", (req, res, next) => {
  res.send("unfinished route");
});
router.post("/api/surveys", (req, res, next) => {
  res.send("unfinished route");
});

export default router;
