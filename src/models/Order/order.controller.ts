import { Request, Response } from 'express'
import services from './order.service'
import orderValidation from "./order.validation"


const getAllOrders = async function(req:Request,res:Response){
   try{
    const result = await services.getAllOrdersFromDB()

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: result
    });

   }catch(err){
     res.status(500).json({
       success: false,
       message: 'Request Could Not Complete',
       data: err,
     });
   }
}

const addOrders = async function(req:Request,res:Response){
    try {
        
        const order = await orderValidation.parseAsync(req.body) 

        const result = await services.addOrdersToDB(order)
        res.status(200).json({
          success: true,
          message: 'Order created successfully!',
          data: result,
        });
      } catch (err:any) {
        res.status(500).json({
          success: false,
          message: 'Request Could Not Complete',
          data: err.message,
        });
      }
}

export default { getAllOrders ,addOrders};