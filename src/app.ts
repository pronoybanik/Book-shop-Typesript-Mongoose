import express, { Request, Response } from 'express';
import cors from 'cors';
import { BookRoutes } from './modules/Books/Book.route';
import { OrderRoutes } from './modules/Orders/Order.route';
import { UserRoutes } from './modules/User/user.route';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './middlewares/globalErrorhandler';
import NotFound from './middlewares/notFound';

const app = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['https://book-shop-frontend-eight.vercel.app','http://localhost:5173'], credentials: true }));
// app.use(cors({origin: ['https://book-shop-frontend-eight.vercel.app'], credentials: true }));

// routes...
app.use('/api/products', BookRoutes);
app.use('/api/orders', OrderRoutes);
app.use('/api/user', UserRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'welcome to the server 3000',
  });
});



// Global error handling
app.use(globalErrorHandler);

app.use(NotFound);

export default app;
