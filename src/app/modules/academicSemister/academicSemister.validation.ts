import { z } from 'zod';

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
] as const;

const createAcademicSemisterZodSchema = z.object({
  body: z.object({
    title: z.enum(['Autumn', 'Summer', 'Fall'], {
      required_error: 'Title is required',
    }),
    year: z.number({
      required_error: 'Year is Required',
    }),
    code: z.enum(['01', '02', '03'], {
      required_error: 'Code is Required',
    }),
    startMonth: z.enum(Month, {
      required_error: 'Start month is Required',
    }),
    endMonth: z.enum(Month, {
      required_error: 'End month is Required',
    }),
  }),
});

export const AcademicSemisterValidation = { createAcademicSemisterZodSchema };

//   await createUserZodSchema.parseAsync(req)
