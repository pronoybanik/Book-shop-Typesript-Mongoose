import { Document } from "mongoose";

export interface IBlog extends Document {
    title: string;
    content: string;
    author: string;
    category: 'Technology' | 'Health' | 'Lifestyle' | 'Business';
    image: string
}


