import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createStudent = async (studentData) => {
    try {
      return await prisma.student.create({
        data: {
          registrationNo: studentData.registrationNo,
          name: studentData.name,
          class: studentData.class,
          rollNo: studentData.rollNo,
          contactNumber: studentData.contactNumber,
          status: studentData.status !== undefined ? studentData.status : true
        }
      });
    } catch (err) {
      // Handling unique constraint violation for registrationNo or class_rollNo
      if (err.code === 'P2002') {
        if (err.meta?.target?.includes('registrationNo')) {
          throw new Error('Registration number must be unique');
        } else if (err.meta?.target?.includes('Student_class_rollNo_key')) {
          throw new Error('Roll number must be unique within the class');
        }
      }
      throw err;  // Rethrow any other errors
    }
  };
    

export const getAllStudents = async (page, limit) => {
  const skip = (page - 1) * limit;
  return await prisma.student.findMany({
    skip,
    take: limit,
    where: { status: true },
    orderBy: { createdAt: 'desc' }
  });
};
export const getStudentByRegNo = async (registrationNo) => {
    return await prisma.student.findUnique({
      where: { registrationNo }
    });
  };
  
  export const updateStudent = async (registrationNo, updateData) => {
    try {
      return await prisma.student.update({
        where: { registrationNo },
        data: updateData
      });
    } catch (err) {
      if (err.code === 'P2025') {
        return null; // Student not found
      }
      throw err;
    }
  };
  export const deleteStudent = async (registrationNo) => {
    try {
      // Permanently delete the student from MongoDB
      return await prisma.student.delete({
        where: { registrationNo }
      });
    } catch (err) {
      if (err.code === 'P2025') {
        return null; // Student not found
      }
      throw err;
    }
  };
  


export default {
  createStudent,
  getAllStudents,
  getStudentByRegNo,
  updateStudent,
  deleteStudent

  
};