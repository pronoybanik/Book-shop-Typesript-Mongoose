import express from 'express';
import { BookControllers } from './Book.controller';
const routes = express.Router();

routes.get('/', BookControllers.getAllBooks);
routes.get('/:id', BookControllers.getBookById);
routes.post('/', BookControllers.createBook);
routes.put('/:id', BookControllers.updateBook);
routes.delete('/:id', BookControllers.deleteBook);

export const BookRoutes = routes;
