import express from 'express';
import { OrderController } from './Order.controller';
const route = express.Router();

route.post('/', OrderController.createOrder);
route.get('/revenue', OrderController.getTotalRevenue);

export const OrderRoutes = route;
