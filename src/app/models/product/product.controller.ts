import { Request, Response } from 'express';
import services from './product.service';
import productValidation from './product.validation';

const getAllProducts = async function (req: Request, res: Response) {
  try {
     const searchTerm = req.query.searchTerm as string;
     const result = searchTerm
       ? await services.getSearchedProductFromDB(searchTerm)
       : await services.getAllProductsFromDB();

     res.status(200).json({
       success: true,
       message: searchTerm
         ? `Products matching search term '${searchTerm}' fetched successfully!`
         : 'Products fetched successfully!',
       data: result,
     });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Request Could Not Complete',
      data: err,
    });
  }
};

const getProductById = async function (req: Request, res: Response) {
  try {
    const productId = { _id: req.params.productId };

    const result = await services.getProductByIdFromDB(productId);

    if (!result) {
      res.status(400).json({
        success: false,
        message: 'Could not found or deleted',
        data: result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Product fetched successfully!',
        data: result,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Request Could Not Complete',
      data: err,
    });
  }
};

const addProduct = async function (req: Request, res: Response) {
  try {
    const product = await productValidation.parseAsync(req.body);
    // const product = req.body

    const result = await services.addProductIntoDB(product);

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Request Could Not Complete',
      data: err,
    });
  }
};

const updateProduct = async function (req: Request, res: Response) {
  try {
    const productId = { _id: req.params.productId };
    const product = await productValidation.parseAsync(req.body);

    // const product = req.body

    await services.updateProductInDB(productId, product);
    const updatedProduct = await services.getProductByIdFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: updatedProduct,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Request Could Not Complete',
      data: err,
    });
  }
};

const deleteProduct = async function (req: Request, res: Response) {
  try {
    const productId = { _id: req.params.productId };

    await services.deleteProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Request Could Not Complete',
      data: err,
    });
  }
};

export default {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
