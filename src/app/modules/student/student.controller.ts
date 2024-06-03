import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StudentServices } from './student.service';

const createStudent = catchAsync(async (req, res, next) => {
  const { student: studentData } = req.body;
  // const zodParsedData = studentValidationSchema.parse(studentData);
  const result = await StudentServices.createStudentIntoDB(studentData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student is created successfully',
    data: result,
  });
});

const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Students are retrieved successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student is retrieved successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student is deleted successfully',
    data: result,
  });
});

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
