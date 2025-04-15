import { Router } from 'express';
import {
  createStudent,
  getAllStudents,
    getStudentByRegNo,
    updateStudent,
    deleteStudent
 
} from '../controllers/studentController.js';
import {
  createStudentValidation,
  paginationValidation,
  updateStudentValidation,

} from '../middlewares/validation.js';

const router = Router();

router.post('/',    createStudentValidation, createStudent);
router.get('/', paginationValidation, getAllStudents);
router.get('/:regNo', getStudentByRegNo);
router.put('/:regNo', updateStudentValidation, updateStudent);
router.delete('/:regNo', deleteStudent);


export default router;