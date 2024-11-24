import Joi from 'joi';

export const bookSchemaValidation = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Title is required.',
  }),
  author: Joi.string().required().messages({
    'string.empty': 'Author is required.',
  }),
  price: Joi.number().required().positive().messages({
    'number.base': 'Price must be a number.',
    'number.positive': 'Price must be a positive number.',
  }),
  category: Joi.string()
    .required()
    .valid('Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious')
    .messages({
      'any.only':
        'Category must be one of Fiction, Science, SelfDevelopment, Poetry, or Religious.',
      'string.empty': 'Category is required.',
    }),
  description: Joi.string().required().messages({
    'string.empty': 'Description is required.',
  }),
  quantity: Joi.number().required().min(0).messages({
    'number.base': 'Quantity must be a number.',
    'number.min': 'Quantity cannot be negative.',
  }),
  inStock: Joi.boolean().required().messages({
    'boolean.base': 'InStock must be a boolean value.',
  }),
});
