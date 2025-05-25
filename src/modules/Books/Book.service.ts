import mongoose, { ObjectId } from 'mongoose';
import { IBook } from './Book.interface';
import { BooksModule } from './Book.module';
import QueryBuilder from '../../builder/QueryBuilder';
import { BookSearchableFields } from './Book.constant';

const getAllBookSFromDB = async (query: Record<string, unknown>) => {
  const bookQuery = new QueryBuilder(BooksModule.find(), query)
    .search(BookSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await bookQuery.modelQuery;
  const meta = await bookQuery.countTotal();

  return {
    meta,
    result,
  };
};

const createBooksIntoDB = async (book: IBook) => {
  const result = await BooksModule.create(book);
  return result;
};

const getBookIdFromDB = async (id: string) => {
  const objectId = new mongoose.Types.ObjectId(id);
  const result = await BooksModule.findById(objectId);
  return result;
};

const upDateBookFromDB = async (id: string, data: IBook) => {
  const objectId = new mongoose.Types.ObjectId(id);
  const result = await BooksModule.updateOne({ _id: objectId }, data, {
    runValidators: true,
  });
  return result;
};

const deleteBookFromDB = async (id: string) => {
  const deleteStudent = await BooksModule.deleteOne({ _id: id });
  return deleteStudent;
};


export const BooksServices = {
  createBooksIntoDB,
  getAllBookSFromDB,
  getBookIdFromDB,
  upDateBookFromDB,
  deleteBookFromDB,
};
