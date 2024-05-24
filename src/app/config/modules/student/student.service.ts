import { StudentModel } from './student.model';

const getAllStudentFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

export const StudentServices = {
  getAllStudentFromDB,
};
