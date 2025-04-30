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
  authenticateToken,
  verifyPermission,
} from "../../middlewares/authMiddlewares.js";
import { USER_ROLES_ENUM } from "../../../constants.js";

const router = express.Router();

router
  .route("/")
  .post(
    authenticateToken,
    verifyPermission([USER_ROLES_ENUM.ADMIN]),
    upload.single("thumbImage"),
    createBlog
  ) // Create a blog post
  .get(getAllBlogs); // Get all blog posts
router
  .route("/:slug")
  .get(getBlogBySlug) // Get a blog post by ID
  .delete(
    authenticateToken,
    verifyPermission([USER_ROLES_ENUM.ADMIN]),
    deleteBlogbyId
  ) // Delete a blog post by ID
  .patch(
    authenticateToken,
    verifyPermission([USER_ROLES_ENUM.ADMIN]),
    upload.single("thumbImage"),
    updateBlogBySlug
  ); // Update a blog post by ID

export default router;
