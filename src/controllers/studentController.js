import studentService from '../services/studentService.js';
import { validationResult } from 'express-validator';

export const createStudent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const student = await studentService.createStudent(req.body);
    res.status(201).json(student);
  } catch (err) {
    next(err);
  }
};

export const getAllStudents = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const students = await studentService.getAllStudents(parseInt(page), parseInt(limit));
    res.status(200).json(students);
  } catch (err) {
    next(err);
  }
};
export const getStudentByRegNo = async (req, res, next) => {
    try {
      const student = await studentService.getStudentByRegNo(req.params.regNo);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.status(200).json(student);
    } catch (err) {
      next(err);
    }
  };
  
  export const updateStudent = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const student = await studentService.updateStudent(req.params.regNo, req.body);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.status(200).json(student);
    } catch (err) {
      next(err);
    }
  };
  
  


export default {
  createStudent,
  getAllStudents,
  getStudentByRegNo,
  updateStudent,
  
};