import express from "express";
import { createBlog, deleteBlogs, getBlogs, singleBlogs, updateBlog } from "./blog.controller";

const router = express.Router();

router.post("/", createBlog);
router.get("/", getBlogs);
router.delete("/:id", deleteBlogs);
router.get("/:id", singleBlogs);
router.patch("/:id", updateBlog);


export const BlogRoutes = router;
