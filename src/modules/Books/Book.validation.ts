import { z } from "zod";

const bookValidateSchema = z.object({
  body: z.object({
    title: z.string(),
    author: z.string(),
    price: z.number(),
    category: z.enum([
        "Fiction",
        "Science",
        "SelfDevelopment",
        "Poetry",
        "Religious",
        "Horror",
        "Comedy",
        "Thriller",
        "Mystery",
        "Fantasy",
        "Romance",
        "Adventure",
        "Biography",
        "History",
        "Philosophy",
        "Psychology",
        "Children",
        "YoungAdult",
        "Crime",
        "Drama"
      ]),
    description: z.string(),
    image: z.string().optional(),
    quantity: z.number(),
    inStock: z.boolean(),
  })
});

export const BookValidation = {
  bookValidateSchema
}
