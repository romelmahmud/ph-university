import { Model, Types } from 'mongoose';

export interface IGuardian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
}

export interface IUserName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface ILocalGuardian {
  name: string;
  occupation: string;
  address: string;
  contactNo: string;
}

export interface IStudent {
  id: string;
  user: Types.ObjectId;
  name: IUserName;
  gender: 'male' | 'female' | 'Other';
  dateOfBirth?: string;
  email: string;
  contactNumber: string;
  emergencyContactNo: string;
  bloodGroup?: 'O+' | 'O-' | 'O+' | 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-';
  presentAddress: string;
  permanentAddress: string;
  guardian: IGuardian;
  localGuardian: ILocalGuardian;
  profileImage?: string;
  admissionSemester: Types.ObjectId;
  isDeleted: boolean;
  academicDepartment: Types.ObjectId;
}

// for creating static
export interface StudentModel extends Model<IStudent> {
  isUserExists(id: string): Promise<IStudent | null>;
}
