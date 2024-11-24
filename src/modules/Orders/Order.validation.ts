import Joi from 'joi';

export const orderSchemaValidation = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Email must be a valid email address.',
  }),
  product: Joi.string().required().messages({
    'string.empty': 'Product ID is required.',
    'string.base': 'Product ID must be a string.',
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    'number.base': 'Quantity must be a number.',
    'number.min': 'Quantity must be at least 1.',
    'any.required': 'Quantity is required.',
  }),
  totalPrice: Joi.number().positive().required().messages({
    'number.base': 'Total Price must be a number.',
    'number.positive': 'Total Price must be a positive number.',
    'any.required': 'Total Price is required.',
  }),
});
