import { Router } from "express";
import { login, register, updateSelfProfile } from "../controllers/user.controller";

const router = Router()

router.post('/login',login)
router.post('/register',register)
router.put('/update',updateSelfProfile)

export default router