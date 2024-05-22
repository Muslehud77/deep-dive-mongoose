import express, { Request, Response } from 'express';
import cors from 'cors';
import { productRoutes } from './models/product/product.route';
import { orderRoutes } from './models/Order/order.route';
const app = express();

// parsers
app.use(express.json());
app.use(cors());

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
