import { Request, Response } from 'express';
import services from './order.service';
import orderValidation from './order.validation';

const getAllOrders = async function (req: Request, res: Response) {
  try {
    const email = req.query.email as unknown as string;
    if (email) {
      const result = await services.getOrderByIdFromDB(email);

      if (!result.length) {
        throw new Error('Order not found for this email');
      }
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: result,
      });
    } else {
      const result = await services.getAllOrdersFromDB();
      if (!result.length) {
        throw new Error('Order not found');
      }
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: result,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Request could not complete',
    });
  }
};

const addOrders = async function (req: Request, res: Response) {
  try {
    const order = await orderValidation.parseAsync(req.body);

    const result = await services.addOrdersToDB(order);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Request could not complete',
    });
  }
};

const getOrderById = async function (req: Request, res: Response) {
  try {
    const email = req.query.email as string;
    const result = await services.getOrderByIdFromDB(email);
    if (!result) {
      throw new Error('Order not found for this email');
    }
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully for user email!',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Request could not complete',
    });
  }
};

export default { getAllOrders, addOrders, getOrderById };
