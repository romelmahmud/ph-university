import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterServices } from './academicSemester.services';

const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  // console.log(req.body);
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic semester is created successfully',
    data: result,
  });
});

const getAllAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'ALL Academic semester is fetched successfully',
    data: result,
  });
});

const getSingleAcademicSemester: RequestHandler = catchAsync(
  async (req, res) => {
    const academicSemesterId = req.params.id;

    const result =
      await AcademicSemesterServices.getSingleAcademicSemesterFromDB(
        academicSemesterId,
      );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic semester is fetched successfully',
      data: result,
    });
  },
);

const updateSingleAcademicSemester: RequestHandler = catchAsync(
  async (req, res) => {
    const academicSemesterId = req.params.id;
    const payload = req.body;

    const result =
      await AcademicSemesterServices.updateSingleAcademicSemesterFromDB(
        academicSemesterId,
        payload,
      );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic semester is fetched successfully',
      data: result,
    });
  },
);

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateSingleAcademicSemester,
};
