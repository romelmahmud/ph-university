import config from '../..';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { UserModel } from './user.model';

const createStudentIntoDB = async (password: string, studentData: IStudent) => {
  //creating a user object
  const userData: Partial<IUser> = {};
  // if password isn't give use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';

  // set manually generate id

  userData.id = '2030100001';

  // creating a user
  const newUser = await UserModel.create(userData);
  //create a student
  if (Object.keys(newUser).length) {
    //set id, _id as user reference

    studentData.id = newUser.id;
    studentData.user = newUser._id;

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
