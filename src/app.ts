import express, { Request, Response } from 'express';
import cors from 'cors'
import { productRoutes } from './models/product/product.route';
const app = express();


// parsers
app.use(express.json())
app.use(cors())


app.use('/api/products',productRoutes)

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!');
});

export default app