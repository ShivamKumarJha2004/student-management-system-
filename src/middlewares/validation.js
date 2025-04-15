import { body, param, query } from 'express-validator';

export const createStudentValidation = [
  body('registrationNo').notEmpty().withMessage('Registration number is required'),
  body('name').notEmpty().withMessage('Name is required'),
  body('class').notEmpty().withMessage('Class is required'),
  body('rollNo').isInt({ min: 1 }).withMessage('Roll number must be a positive integer'),
  body('contactNumber').notEmpty().withMessage('Contact number is required')
    .isLength({ min: 10, max: 15 }).withMessage('Contact number must be between 10-15 characters'),
  body('status').optional().isBoolean().withMessage('Status must be a boolean')
];


export const paginationValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1-100')
];

export default {
  createStudentValidation,
  
  paginationValidation
};