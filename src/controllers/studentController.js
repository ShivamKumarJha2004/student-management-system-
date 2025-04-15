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


export default {
  createStudent,
  getAllStudents,
  
};