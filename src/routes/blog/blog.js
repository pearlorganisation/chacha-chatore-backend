import express from "express";
import {
  createBlog,
  deleteBlogbyId,
  getAllBlogs,
  getBlogBySlug,
  updateBlogBySlug,
} from "../../controllers/blog/blog.js";
import { upload } from "../../middlewares/multerMiddlware.js";
import { authenticateToken } from "../../middlewares/authMiddlewares.js";

const router = express.Router();

router
  .route("/")
  .post(authenticateToken, upload.single("thumbImage"), createBlog) // Create a blog post
  .get(getAllBlogs); // Get all blog posts
router
  .route("/:slug")
  .get(getBlogBySlug) // Get a blog post by ID
  .delete(authenticateToken, deleteBlogbyId) // Delete a blog post by ID
  .patch(authenticateToken, upload.single("thumbImage"), updateBlogBySlug); // Update a blog post by ID

export default router;
