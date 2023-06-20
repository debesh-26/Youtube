import express from 'express';
import {register,login,googlelogin} from "../controllers/auth.js";

const router = express.Router();
//create a new user
router.post("/register", register);
//login
router.post("/login", login);

//google authentication
router.post("/googlelogin", googlelogin);

export default router;