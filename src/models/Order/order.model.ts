import { Schema, model } from "mongoose";
import TOrder from "./order.interface";

const orderSchema = new Schema<TOrder>({
    email : {type:String,required:true},
    productId:{type:String,required:true},
    price:{type:Number,required:true,min:0},
    quantity:{type:Number,required:true,min:0}

})

export const orderModel = model<TOrder>('orders', orderSchema);