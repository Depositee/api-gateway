import { Router } from "express";
import { getReviewByDepositeeId } from "../controllers/review.controller";

const router = Router();

router.post("/", createOrder);

export default router;
