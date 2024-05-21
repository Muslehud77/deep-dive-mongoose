import { Schema, model, connect } from 'mongoose';
import { TProduct } from './product.interface';

const isRequiredString = { type: String, required: true };
const variantSchema = new Schema({
type: isRequiredString,
value:isRequiredString
})

const productSchema = new Schema<TProduct>({
  name: { ...isRequiredString, unique: true },
  description: isRequiredString,
  price: { type: Number, required: true },
  category: isRequiredString,
  tags: { type: [String], required: true },
  variants: {
    type: [variantSchema],
    required: true,
  },
  inventory: [{ quantity: Number, inStock: Boolean }],
  isDeleted: { type: Boolean, default: false },
});

export const productModel = model<TProduct>('products',productSchema)
