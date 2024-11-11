import { Router } from "express";
import {
  getUserProfile,
  login,
  register,
  updateSelfProfile,
  logout,
  getUserData,
} from "../controllers/user.controller";

const router = Router();

router.get("/info/:userId",getUserData)
router.post("/login", login);
router.post("/register", register);
router.post("/profile", getUserProfile);
router.put("/update", updateSelfProfile);
router.post("/logout", logout);

export default router;
