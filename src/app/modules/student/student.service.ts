import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { IStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: IStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new AppError(httpStatus.NOT_FOUND, 'User already exists!');
  }
  const result = await Student.create(studentData);
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
