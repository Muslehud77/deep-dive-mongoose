import { Schema, model, connect } from 'mongoose';
import { TProduct } from './product.interface';

const isRequiredString = { type: String, required: true };

const productSchema = new Schema<TProduct>({
  name: isRequiredString,
  description: isRequiredString,
  price: { type: Number, required: true },
  category: isRequiredString,
  tags: { type: [String], required: true },
  variants: [{ type: String, value: String }],
  inventory: [{ quantity: Number, inStock: Boolean }],
  isDeleted: { type: Boolean, default: false },
});

export const productModel = model<TProduct>('products',productSchema)
