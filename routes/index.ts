import { Router } from "express";
import authRoutes from "./authRoutes.js";
import billingRoutes from "./billingRoutes.js";
import surveyRoutes from "./surveyRoutes.js";

const router = Router();

router.use("/api/stripe", billingRoutes);
router.use("/", authRoutes);
router.use("/api/surveys", surveyRoutes);

export default router;
