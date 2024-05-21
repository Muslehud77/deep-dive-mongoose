import express from 'express'
import productController from './product.controller'
const route = express.Router()

route.post('/',productController.addProduct)
route.get('/',productController.getAllProducts)

export const productRoutes = route