import express from 'express';
import { BookControllers } from './Book.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BookValidation } from './Book.validation';
const routes = express.Router();

routes.get('/', BookControllers.getAllBooks);
routes.get('/:id', BookControllers.getBookById);
routes.post('/',
    validateRequest(BookValidation.bookValidateSchema),
    BookControllers.createBook);
routes.put('/:id', BookControllers.updateBook);
routes.delete('/:id', BookControllers.deleteBook);

export const BookRoutes = routes;
