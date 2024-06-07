import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
  name: {
    type: String,
    required: [true, 'academic department name is required'],
    unique: true,
  },
  academicFaculty: {
    type: Schema.ObjectId,
    ref: 'AcademicFaculty',
  },
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
