import { Router } from "express";
import {
  GetAllPaymentByUserId,
  GetBalanceByUserId,
  AddBalance,
} from "../controllers/payment.controller";

const router = Router();

router.get("/get_payment/:userId", GetAllPaymentByUserId);
router.get("/get_balance/:userId", GetBalanceByUserId);
router.post("/add_balance", AddBalance);

export default router;
