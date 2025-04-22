import express from 'express';
import { OrderController } from './Order.controller';
const routes = express.Router();

routes.post('/', OrderController.createOrder);
routes.get('/', OrderController.getAllOrder);
routes.delete('/:id', OrderController.deleteOrder);
routes.get('/revenue', OrderController.getTotalRevenue);
routes.get('/:userId', OrderController.getUserOrderProduct);

export const OrderRoutes = routes;
