import { Router } from 'express';
import {
  createStudent,
  getAllStudents,
 
} from '../controllers/studentController.js';
import {
  createStudentValidation,
  paginationValidation
} from '../middlewares/validation.js';

const router = Router();

router.post('/', createStudentValidation, createStudent);
router.get('/', paginationValidation, getAllStudents);

export default router;