import { Router } from "express";
import { getReviewByDepositeeId } from "../controllers/review.controller";

const router = Router()


router.get('/reviews/depositee/:depositeeId',getReviewByDepositeeId)

export default router