import express from "express";
import { login, logout } from "../../controllers/auth/auth.js";
import { authenticateRefreshToken } from "../../middlewares/authMiddlewares.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/logout").post(authenticateRefreshToken, logout);

export default router;
