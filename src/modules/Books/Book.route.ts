import express from 'express';
import { BookControllers } from './Book.controller';
const route = express.Router();

route.get("/", BookControllers.getAllBooks);
route.get("/:id", BookControllers.getBookById);
route.post("/", BookControllers.createBook);
route.put("/:id", BookControllers.updateBook);
route.delete("/:id", BookControllers.deleteBook);

export const BookRoutes = route;