import express from 'express';
import { OrderController } from './Order.controller';
const routes = express.Router();

routes.post('/', OrderController.createOrder);
routes.get('/revenue', OrderController.getTotalRevenue);

export const OrderRoutes = routes;
