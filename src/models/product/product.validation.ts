import z from 'zod';

// Define the Zod schema for the product

const variant = z.object({
  type: z.string(),
  value: z.string(),
});

const productValidation = z.object({
  name: z.string().nonempty('Name is required'),
  description: z.string().nonempty('Description is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  category: z.string().nonempty('Category is required'),
  tags: z.array(z.string().nonempty('At least one tag is required')),
  variants: z
    .array(variant)
    .nonempty({ message: 'At least one variant is required' }),
  inventory: z.object({
    quantity: z.number().min(0, 'Quantity must be a non-negative number'),
    inStock: z.boolean(),
  }),
  isDeleted: z.boolean().default(false),
});

export default productValidation;
