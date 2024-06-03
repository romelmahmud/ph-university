import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const { password, student } = req.body;

    // will call service function to send this data

    const result = await UserServices.createStudentIntoDB(password, student);

    // send response

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserControllers = {
  createStudent,
};
