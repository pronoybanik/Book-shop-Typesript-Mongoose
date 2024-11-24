import mongoose, { ObjectId } from 'mongoose';
import { IBook } from './Book.interface';
import { BooksModule } from './Book.module';

const getAllBookSFromDB = async (query: any) => {
    const result = await BooksModule.find(query);
    return result;
};

const createBooksIntoDB = async (book: IBook) => {
    const result = await BooksModule.create(book);
    return result;
};

const getBookIdFromDB = async (id: string) => {
    const objectId = new mongoose.Types.ObjectId(id);
    const result = await BooksModule.findById(id)
    return result;
};

const upDateBookFromDB = async (id: string, data: IBook) => {
    const objectId = new mongoose.Types.ObjectId(id);
    const result = await BooksModule.updateOne({ _id: objectId },
        data,
        {
            runValidators: true,
        })
    return result;
};

const deleteBookFromDB = async (id: string) => {
    const objectId = new mongoose.Types.ObjectId(id);
    const result = await BooksModule.deleteOne({ _id: objectId })
    console.log("result", result);
    return result;
};

export const BooksServices = {
    createBooksIntoDB,
    getAllBookSFromDB,
    getBookIdFromDB,
    upDateBookFromDB,
    deleteBookFromDB
};
