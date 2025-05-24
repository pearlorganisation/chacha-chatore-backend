import express from "express";
import {
  createBlog,
  deleteBlogbyId,
  getAllBlogs,
  getBlogBySlug,
  updateBlogBySlug,
} from "../../controllers/blog/blog.js";
import { upload } from "../../middlewares/multerMiddlware.js";
import {
  authenticateRefreshToken,
  verifyPermission,
} from "../../middlewares/authMiddlewares.js";
import { USER_ROLES_ENUM } from "../../../constants.js";

const router = express.Router();

router
  .route("/")
  .post(
    authenticateRefreshToken,
    verifyPermission([USER_ROLES_ENUM.ADMIN]),
    upload.single("thumbImage"),
    createBlog
  ) // Create a blog post
  .get(getAllBlogs); // Get all blog posts

router
  .route("/:slug")
  .get(getBlogBySlug) // Get a blog post by ID
  .patch(
    authenticateRefreshToken,
    verifyPermission([USER_ROLES_ENUM.ADMIN]),
    upload.single("thumbImage"),
    updateBlogBySlug
  ); // Update a blog post by ID

router
  .route("/:id")
  .delete(
    authenticateRefreshToken,
    verifyPermission([USER_ROLES_ENUM.ADMIN]),
    deleteBlogbyId
  );

export default router;
