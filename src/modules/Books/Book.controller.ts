import { Request, Response } from 'express';
import { BooksServices } from './Book.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendRespons';
import httpStatus from 'http-status';

const getAllBooks = catchAsync(async (req, res) => {
  const result = await BooksServices.getAllBookSFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const createBook = catchAsync(async (req, res) => {
  const book = req.body;
  const result = await BooksServices.createBooksIntoDB(book);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created successfully',
    data: result,
  });
});

const getBookById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BooksServices.getBookIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successfully',
    data: result,
  });
});

const updateBook = catchAsync(async (req, res) => {
  const bookData = req.body;
  const { id } = req.params;
  const result = await BooksServices.upDateBookFromDB(id, bookData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully',
    data: result,
  });
});

const getBooksByCategory = catchAsync(async (req, res) => {
  const { categoryValue } = req.params;

  const result = await BooksServices.getBooksByCategory(categoryValue);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book get successfully',
    data: result,
  });
});

const deleteBook = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await BooksServices.deleteBookFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully',
    data: result,
  });
});

export const BookControllers = {
  getAllBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook,
  getBooksByCategory
};
