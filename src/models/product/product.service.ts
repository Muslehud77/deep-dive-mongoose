import { TProduct } from './product.interface';
import { productModel } from './product.model';

const addProductIntoDB = async (product: TProduct) => {
  const result = await productModel.create(product);

  return result;
};
const updateProductInDB = async (id:{_id:string},product: TProduct) => {
  const result = await productModel.updateOne(id,product);

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

const getSearchedProductFromDB = async (searchTerm:string){
    const result = await productModel.find({description:{$regex:searchTerm}})
}


export default {
  addProductIntoDB,
  getAllProductsFromDB,
  getProductByIdFromDB,
  updateProductInDB,
};
