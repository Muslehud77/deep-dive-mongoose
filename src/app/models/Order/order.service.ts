import { productModel } from '../product/product.model';
import TOrder from './order.interface';
import { orderModel } from './order.model';

const getAllOrdersFromDB = async () => {
  const result = await orderModel.find();

  return result;
};

const addOrdersToDB = async (order: TOrder) => {
  const productId = { _id: order.productId };
  const quantity = order.quantity;

  // checking if it is an existing product
  const isExistingProduct = await productModel.findOne({
    ...productId,
    isDeleted: false,
  });

  if (isExistingProduct) {
    const stock = isExistingProduct.inventory.quantity;
    const newQuantity = stock - quantity;

    // if the ordered quantity is greater than new Quantity returning with an error
    if (newQuantity < 0) {
      throw new Error('Insufficient quantity available in inventory');
    }
    if (stock === 0) {
      // making the inventory out-of-stock if there is no stock
      await productModel.updateOne(productId, { 'inventory.inStock': false });

      throw new Error('Insufficient quantity available in inventory');
    }
    await productModel.updateOne(productId, {
      'inventory.quantity': newQuantity,
      'inventory.inStock': newQuantity > 0,
    });

    const result = await orderModel.create(order);

    return result;
  }

  throw new Error('The product does not exist!');
};

const getOrderByIdFromDB = async (email: string) => {
  const result = await orderModel.find({ email });
  return result;
};

export default { getAllOrdersFromDB, addOrdersToDB, getOrderByIdFromDB };
