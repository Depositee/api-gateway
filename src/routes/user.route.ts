import { Router } from "express";
import { getUserProfile, login, register, updateSelfProfile } from "../controllers/user.controller";

const router = Router()

router.post('/login',login)
router.post('/register',register)
router.post('/profile',getUserProfile)
router.put('/update',updateSelfProfile)

export default router