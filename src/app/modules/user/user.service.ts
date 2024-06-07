import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { UserModel } from './user.model';
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
  userData.id = await generateStudentId(admissionSemester);

  // creating a user
  const newUser = await UserModel.create(userData);
  //create a student
  if (Object.keys(newUser).length) {
    //set id, _id as user reference

    payload.id = newUser.id;
    payload.user = newUser._id;

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
