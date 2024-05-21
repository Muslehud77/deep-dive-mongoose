import { TProduct } from "./product.interface";
import { productModel } from "./product.model";

const addProductIntoDB = async (product:TProduct)=>{

    const result = await productModel.create(product)

    return result


}


const getAllProductsFromDB =  async ()=>{

    const result = await productModel.find()

    return result
}

export default { addProductIntoDB, getAllProductsFromDB };