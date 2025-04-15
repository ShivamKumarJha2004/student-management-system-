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
    if (err.code === 'P2002') {
      if (err.meta?.target?.includes('regregistrationNo')) {
        throw new Error('Registration number must be unique');
      } else if (err.meta?.target?.includes('class_rollNo_unique')) {
        throw new Error('Roll number must be unique within the class');
      }
    }
    throw err;
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
  


export default {
  createStudent,
  getAllStudents,
  getStudentByRegNo,
  updateStudent,

  
};