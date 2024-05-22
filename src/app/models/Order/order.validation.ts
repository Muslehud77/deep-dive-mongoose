import z from 'zod';

const orderValidation = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email format' })
    .min(1, { message: 'Email is required' }),
  productId: z.string().min(1, { message: 'Product ID is required' }),
  price: z
    .number()
    .min(0, { message: 'Price must be a positive number' })
    .refine(val => val > 0, { message: 'Price must be greater than 0' }),
  quantity: z
    .number()
    .min(1, { message: 'Quantity must be at least 1' })
    .refine(val => Number.isInteger(val), {
      message: 'Quantity must be an integer',
    }),
});

export default orderValidation;
