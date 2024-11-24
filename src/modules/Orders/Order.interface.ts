import mongoose from 'mongoose';

export type IOrder = {
  email: string;
  //product: string;
  product: mongoose.Types.ObjectId;
  quantity: number;
  totalPrice: number;
};
