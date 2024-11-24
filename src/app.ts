import express, { Request, Response } from 'express';
import cors from 'cors';
import { BookRoutes } from './modules/Books/Book.route';
const app = express();

//parsers
app.use(express.json());
app.use(cors());


// routes
app.use('/api/products', BookRoutes);

app.get('/', (req: Request, res: Response) => {
    console.log('Hello world');
});

export default app;
