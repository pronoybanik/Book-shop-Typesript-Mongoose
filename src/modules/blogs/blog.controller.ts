/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { Blogs } from "./blog.module";

export const createBlog = async (req: Request, res: Response) => {
    try {
        const blog = await Blogs.create(req.body);
        res.status(201).json({ message: "Blog created", blog });
    } catch (error) {
        console.error("Error creating blog:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getBlogs = async (req: Request, res: Response) => {
    try {
        const blogs = await Blogs.find();
        res.json({ message: "Get All Blogs", data: blogs });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteBlogs = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const contact = await Blogs.findByIdAndDelete(id);
        res.status(201).json({ message: "Blog deleted successfully", data: contact });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const singleBlogs = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const contact = await Blogs.findById(id);
        res.status(201).json({ message: "Single blog retrieved successfully", data: contact });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};



export const updateBlog = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ status: "fail", error: "Blog ID is required" });
            return;
        }

        const blog = await Blogs.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!blog) {
            res.status(404).json({
                status: "fail",
                error: "Couldn't update blog, blog not found"
            });
            return;
        }

        res.status(200).json({
            status: "success",
            message: "Blog updated successfully",
            data: blog,
        });
    } catch (error) {
        next(error);
    }
};
