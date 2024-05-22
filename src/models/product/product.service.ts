import { TProduct } from './product.interface';
import { productModel } from './product.model';

const addProductIntoDB = async (product: TProduct) => {
  const result = await productModel.create(product);

  return result;
};
const updateProductInDB = async (product: TProduct) => {
  const result = await productModel.create(product);

  return result;
};

const getAllProductsFromDB = async () => {
  const result = await productModel.find();

  return result;
};

const getProductByIdFromDB = async (id: { _id: string }) => {
  const result = await productModel.findOne(id);
  return result;
};

export default {
  addProductIntoDB,
  getAllProductsFromDB,
  getProductByIdFromDB,
  updateProductInDB,
};
