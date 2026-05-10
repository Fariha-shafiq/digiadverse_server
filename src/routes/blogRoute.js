import { Router } from "express";
import upload from "../middleware/uploads.js";
import { validateBlog } from "../middleware/validateMiddleware.js";
import {
  createBlog,
  getBlogs,
  getBlogBySlug,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

const blogRouter = Router();

blogRouter.post("/",upload.single("image"), validateBlog, createBlog);
blogRouter.get("/", getBlogs);
blogRouter.get("/:slug", getBlogBySlug);
blogRouter.get("/id/:id", getBlogById);
blogRouter.put("/:id", upload.single("image"), validateBlog, updateBlog);
blogRouter.delete("/:id", deleteBlog);

export default blogRouter;