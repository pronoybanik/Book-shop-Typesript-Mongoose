import mongoose, { Schema } from "mongoose";
import { IBlog } from "./blog.interface";

const BlogSchema = new Schema<IBlog>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    category: {
        type: String,
        enum: ['Technology', 'Health', 'Lifestyle', 'Business', "Portfolio"], // Example categories
        required: true,
    },
    image: String
}, { timestamps: true });

export const Blogs = mongoose.model<IBlog>("Blog", BlogSchema);
