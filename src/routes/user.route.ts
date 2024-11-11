import { Router } from "express";
import {
  getUserProfile,
  login,
  register,
  updateSelfProfile,
  logout,
} from "../controllers/user.controller";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/profile", getUserProfile);
router.put("/update", updateSelfProfile);
router.post("/logout", logout);

export default router;
