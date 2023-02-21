import { Router } from "express";
import authRoutes from "./authRoutes.js";
import billingRoutes from "./billingRoutes.js";

const router = Router();

router.use("/api/stripe", billingRoutes);
router.use("/", authRoutes);

export default router;
