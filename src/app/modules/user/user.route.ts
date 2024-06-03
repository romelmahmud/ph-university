import express, { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import { studentValidationSchemas } from '../student/student.validation';
import { UserControllers } from './user.controller';

const router = express.Router();

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const zodParsedData = await schema.parseAsync({
      body: req.body,
    });
  };
};

router.post(
  '/create-student',
  validateRequest(studentValidationSchemas.studentValidationSchema),
  UserControllers.createStudent,
);

export const UserRoutes = router;
