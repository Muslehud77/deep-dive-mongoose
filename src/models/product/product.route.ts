import express from 'express';
import productController from './product.controller';
const route = express.Router();

route.post('/', productController.addProduct);
route.get('/', productController.getAllProducts);
route.get('/:productId', productController.getProductById);
route.put('/:productId', productController.updateProduct);
route.delete('/:productId', productController.deleteProduct);



export const productRoutes = route;
