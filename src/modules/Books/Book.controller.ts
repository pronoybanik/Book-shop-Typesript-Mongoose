import { Request, Response } from 'express';
import { BooksServices } from './Book.service';
import { bookSchemaValidation } from './Book.validation';

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;

    const query = searchTerm
      ? {
          $or: [
            { title: { $regex: searchTerm, $options: 'i' } },
            { author: { $regex: searchTerm, $options: 'i' } },
            { category: { $regex: searchTerm, $options: 'i' } },
          ],
        }
      : {};

    const result = await BooksServices.getAllBookSFromDB(query);

    res.status(200).json({
      message: 'Books retrieved successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: 'something went wrong',
      success: false,
      err: error,
    });
  }
};

const createBook = async (req: Request, res: Response) => {
  try {
    const book = req.body;

    const { error, value } = bookSchemaValidation.validate(book);

    const result = await BooksServices.createBooksIntoDB(value);

    if (error) {
      res.status(500).json({
        success: false,
        message: 'something went wrong',
        error: error.details,
      });
    }

    res.status(200).json({
      message: 'Book is create successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message || 'something went wrong',
      success: false,
      err: error,
    });
  }
};

const getBookById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await BooksServices.getBookIdFromDB(id);

    res.status(200).json({
      message: 'Book is retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: 'something went wrong',
      success: false,
      err: error,
    });
  }
};

const updateBook = async (req: Request, res: Response) => {
  try {
    const bookData = req.body;
    const { id } = req.params;

    const result = await BooksServices.upDateBookFromDB(id, bookData);

    res.status(200).json({
      message: 'Book updated successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: 'something went wrong',
      success: false,
      err: error,
    });
  }
};

const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log('controller id ', id);

    const result = await BooksServices.deleteBookFromDB(id);

    res.status(200).json({
      message: 'Book deleted successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: 'something went wrong',
      success: false,
      err: error,
    });
  }
};

export const BookControllers = {
  getAllBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook,
};
