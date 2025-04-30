import express from "express";
import { login, logout, register } from "../../controllers/auth/auth.js";
import { authenticateToken } from "../../middlewares/authMiddlewares.js";

const router = express.Router();

router.route("/signup").post(register);
router.route("/login").post(login);
router.route("/logout").post(authenticateToken, logout);

export default router;
