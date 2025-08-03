import express from "express";
import {
  allBlog,
  createBlog,
  deleteBlog,
  getBlogById,
  getUserBlogs,
  updateBlog,
} from "../Controllers/blogController.js";
import { auth } from "../Middleware/auth.js";
const blogRouter = express.Router();

blogRouter.post("/", auth, createBlog);
blogRouter.get("/getBlogs", allBlog);
blogRouter.get("/getAuthorBlogs", auth, getUserBlogs);
blogRouter.get("/:id", getBlogById);
blogRouter.put("/update/:id", auth, updateBlog);
blogRouter.delete("/delete/:id", auth, deleteBlog);

export default blogRouter;
