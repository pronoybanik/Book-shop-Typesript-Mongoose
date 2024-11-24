import express, { Request, Response } from 'express';
import cors from 'cors';
import { BookRoutes } from './modules/Books/Book.route';
import { OrderRoutes } from './modules/Orders/Order.route';
const app = express();

//parsers
app.use(express.json());
app.use(cors());

// routes
app.use('/api/products', BookRoutes);
app.use('/api/orders', OrderRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'welcome to the server 3000',
  });
});

export default app;
