import express, { Request, Response } from 'express';
import cors from 'cors';
import { BookRoutes } from './modules/Books/Book.route';
import { OrderRoutes } from './modules/Orders/Order.route';
import { UserRoutes } from './modules/User/user.route';
import cookieParser from 'cookie-parser';

const app = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

// routes...
app.use('/api/products', BookRoutes);
app.use('/api/orders', OrderRoutes);
app.use('/api/user', UserRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'welcome to the server 3000',
  });
});

export default app;
