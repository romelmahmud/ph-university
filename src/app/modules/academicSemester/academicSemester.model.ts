import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import { AppError } from '../../errors/AppError';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: AcademicSemesterName,
      required: [
        true,
        "Academic Semester name must be 'Autumn' or 'Summer' or 'Fall'",
      ],
    },
    code: {
      type: String,
      enum: AcademicSemesterCode,
      required: [true, "Academic Semester code must be '01' or '02' or '03'"],
    },

    year: {
      type: String,
      require: [true, 'Year is required'],
    },
    startMonth: {
      type: String,
      required: true,
      enum: {
        values: Months,
        message: 'Months is required',
      },
    },
    endMonth: {
      type: String,
      required: true,
      enum: {
        values: Months,
        message: 'Months is required',
      },
    },
  },
  {
    timestamps: true,
  },
);

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester is already exists');
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
