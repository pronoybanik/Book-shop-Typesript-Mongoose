import { z } from "zod";

const bookValidateSchema = z.object({
  body: z.object({
    title: z.string(),
    author: z.string(),
    price: z.number(),
    category: z.enum(["Fiction", "Science", "SelfDevelopment", "Poetry", "Religious"]),
    description: z.string(),
    image: z.string(),
    quantity: z.number(),
    inStock: z.boolean(),
  })
});

export const BookValidation = {
  bookValidateSchema
}
