import { Schema, model } from 'mongoose';
import { TAcademicSemester, TMonths } from './academicSemester.interface';

const Months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: {
        values: ['Autumn', 'Summer', 'Fall'],
        message:
          "Academic Semester name must be 'Autumn' or 'Summer' or 'Fall'",
      },
    },
    code: {
      type: String,
      enum: {
        values: ['01', '02', '03'],
        message: "Academic Semester code must be '01' or '02' or '03'",
      },
    },
    year: {
      type: Date,
      require: [true, 'Year is required'],
    },
    startMonth: {
      type: String,
      enum: {
        values: Months,
        message: 'Months is required',
      },
    },
    endMonth: {
      type: String,
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

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
