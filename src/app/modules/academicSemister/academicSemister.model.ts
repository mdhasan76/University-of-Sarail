import { Schema, model } from 'mongoose';
import { IAcademicSemister } from './academicSemister.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const Month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const academicSemisterSchema = new Schema<IAcademicSemister>(
  {
    title: {
      type: String,
      required: true,
      enum: ['Autumn', 'Summer', 'Fall'],
    },
    code: {
      type: String,
      required: true,
      enum: ['01', '02', '03'],
    },
    year: {
      type: Number,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
      enum: Month,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Month,
    },
  },
  {
    timestamps: true,
  }
);

academicSemisterSchema.pre('save', async function (porecallkori) {
  const isAxist = await AcademicSemister.findOne({
    title: this.title,
    year: this.year,
  });
  if (isAxist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic semister is already exist !'
    );
  }
  porecallkori();
});

export const AcademicSemister = model<IAcademicSemister>(
  'AcademicSemisters',
  academicSemisterSchema
);
