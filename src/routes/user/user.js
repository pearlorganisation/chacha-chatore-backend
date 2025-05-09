import express from "express";
import { authenticateToken } from "../../middlewares/authMiddlewares.js";
import {
  getUserProfile,
  updateUserProfile,
} from "../../controllers/user/user.js";

const router = express.Router();

router
  .route("/profile")
  .get(authenticateToken, getUserProfile)
  .patch(authenticateToken, updateUserProfile);

export default router;
