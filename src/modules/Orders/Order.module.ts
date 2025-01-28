import mongoose from 'mongoose';
import { IOrder } from './Order.interface';

const orderSchema = new mongoose.Schema({
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    quantity: { type: Number },
  }],
  totalPrice: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export const OrderModule = mongoose.model<IOrder>('Order', orderSchema);
