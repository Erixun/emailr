import { Router } from "express";

const router = Router();

router.post("/api/stripe", (req, res, next) => {
  //TODO: use stripe API wrapper
  console.log(req);
});

export default router;
