import mongoose from 'mongoose';
import { IOrder } from './Order.interface';

const orderSchema = new mongoose.Schema<IOrder>(
  {
    email: { type: String, unique: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    },
    quantity: { type: Number },
    totalPrice: { type: Number },
  },
  {
    timestamps: true,
  },
);

export const OrderModule = mongoose.model<IOrder>('Order', orderSchema);
