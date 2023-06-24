import { IGenericErrorResponse } from '../interface/common';
import { IGenericErrorMessage } from '../interface/error';
import { ZodError, ZodIssue } from 'zod';

const handleZodError = (err: ZodError): IGenericErrorResponse => {
  // const ex = err.issues.map(el => el.path);
  // console.log(ex, 'eda zod error');

  const errors: IGenericErrorMessage[] = err.issues.map((issues: ZodIssue) => {
    return {
      path: issues?.path[issues.path.length - 1],
      message: issues?.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation errro',
    errorMessage: errors,
  };
};

export default handleZodError;
