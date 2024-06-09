import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, student } = req.body;

  // will call service function to send this data

  const result = await UserServices.createStudentIntoDB(password, student);

  // console.log(result);

  // send response

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student is created successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
