import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../config';
import { AppError } from '../../errors/AppError';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: IStudent) => {
  //creating a user object
  const userData: Partial<IUser> = {};
  // if password isn't give use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester: TAcademicSemester | null =
    await AcademicSemester.findById(payload.admissionSemester);

  // create isolation environment
  const session = await mongoose.startSession();

  try {
    // staring session
    session.startTransaction();
    // set generated id
    userData.id = await generateStudentId(admissionSemester);
    // creating a user(transaction-I)
    const newUser = await User.create([userData], { session });
    //create a student

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    //set id, _id as user reference
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // creating a student(transaction-II)

    const newStudent = await Student.create([payload], { session });
    console.log(newStudent);
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const UserServices = {
  createStudentIntoDB,
};
