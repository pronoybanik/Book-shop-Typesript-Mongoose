import mongoose from 'mongoose';

export type IOrder = {
  userId: mongoose.Types.ObjectId;  
  products: Array<{
    productId: mongoose.Types.ObjectId;
    quantity: number;
  }>;
  totalPrice: number;
};
